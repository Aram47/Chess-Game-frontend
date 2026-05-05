import React, { useCallback, useRef, useState } from "react";
import { Chess } from "chess.js";
import { useGameSocket } from "../hooks/useGameSocket";
import { startGameWithBot, makeMoveInGameWithBot } from "../api/game";

import type {
  PlayerColor,
  GameStatus,
  MoveType,
  MakeMoveResponse,
  GameOverResponse,
  BotLevel,
  BotColor,
} from "../types/gameType";
import type {
  GameStartedPayload,
  MoveMadePayload,
  GameFinishedPayload,
  GameResumedPayload,
} from "../types/gameType";
import { GameContext } from "../context/GameContext";
import {
  useSyncGameState,
  useDetermineWinner,
} from "../helpers/games/useGameHelpers";
import { useAuth } from "../context/AuthContext";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chessRef = useRef(new Chess());
  const { user } = useAuth();

  const [isLiveGame, setIsLiveGame] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [playerColor, setPlayerColor] = useState<PlayerColor>("w");
  const [fen, setFen] = useState(chessRef.current.fen());
  const [level, setLevel] = useState<BotLevel>("medium");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [lastMove, setLastMove] = useState<MoveType | null>(null);
  const [moveHistory, setMoveHistory] = useState<MoveType[]>([]);
  const [winner, setWinner] = useState<
    "you" | "opponent" | "bot" | "draw" | null
  >(null);
  const [showModal, setShowModal] = useState<string | null>("");

  const syncGameState = useSyncGameState(chessRef, setFen, setGameStatus);
  const determineWinner = useDetermineWinner(playerColor, isLiveGame);

  const resetGame = useCallback(() => {
    chessRef.current = new Chess();
    setRoomId(null);
    setGameStatus("idle");
    setFen(chessRef.current.fen());
    setLastMove(null);
    setMoveHistory([]);
    setWinner(null);
    setIsBotThinking(false);
  }, []);

  const startLiveGame = useCallback(
    (id: string, color: PlayerColor) => {
      resetGame();
      setRoomId(id);
      setPlayerColor(color);
      setIsLiveGame(true);
      chessRef.current = new Chess();
      setFen(chessRef.current.fen());
      setGameStatus("playing");
    },
    [resetGame],
  );

  const handleGameStarted = useCallback(
    (payload: GameStartedPayload) => {
      if (!user) return;
      const color: PlayerColor = payload.white === String(user.id) ? "w" : "b";
      startLiveGame(payload.roomId, color);
    },
    [user, startLiveGame],
  );

  const handleMoveMade = useCallback(
    (payload: MoveMadePayload) => {
      // 1. Check whose turn it is on the local instance
      const boardTurn = chessRef.current.turn();

      // 2. Identify the color of the move being received
      // (chess.js 'move' results or payload often have this,
      // but we can check if the move's 'from' square had a piece of boardTurn color)

      // 3. IMPORTANT: If it's a Live Game and the move being received is
      // for the turn we JUST completed, ignore it to prevent the "Invalid Move" error.
      if (isLiveGame && boardTurn !== (payload.color || boardTurn)) {
        // This is likely our own move reflecting back from the server
        return;
      }

      try {
        const result = chessRef.current.move(payload.move);
        if (result) {
          setLastMove(payload.move);
          setMoveHistory((prev) => [...prev, payload.move]);
          syncGameState();
        }
      } catch (e) {
        // If it still fails, it's already in sync or actually invalid
        console.warn(
          "Incoming move ignored (likely already applied):",
          payload.move,
        );
      }
    },
    [syncGameState, isLiveGame], // Added isLiveGame to dependencies
  );
  const handleGameFinished = useCallback(
    (payload: GameFinishedPayload) => {
      setWinner(determineWinner(payload.winner));
      setGameStatus(
        payload.reason === "leave" ? "idle" : payload.reason || "checkmate",
      );
    },
    [determineWinner],
  );

  const handleGameResumed = useCallback((payload: GameResumedPayload) => {
    chessRef.current = new Chess(payload.fen);
    setFen(payload.fen);
    setGameStatus("playing");
  }, []);

  const { connectionState, emitFindGame, emitMakeMove } = useGameSocket({
    onWaitingForOpponent: () => setGameStatus("waiting"),
    onGameStarted: handleGameStarted,
    onMoveMade: handleMoveMade,
    onGameFinished: handleGameFinished,
    onGameResumed: handleGameResumed,
  });

  const findMatch = useCallback(() => {
    setIsLiveGame(true);
    setGameStatus("waiting");
    emitFindGame();
  }, [emitFindGame]);

  const onDrop = useCallback(
    async (source: string, target: string): Promise<boolean> => {
      if (gameStatus !== "playing" || !roomId || isBotThinking) return false;

      const currentTurn = chessRef.current.turn();
      if (isLiveGame && currentTurn !== playerColor) return false;

      const movePayload: MoveType = {
        from: source,
        to: target,
        promotion: "q",
      };

      try {
        const move = chessRef.current.move(movePayload);
        if (!move) return false;

        setFen(chessRef.current.fen());
        setLastMove(movePayload);
        setMoveHistory((prev) => [...prev, movePayload]);

        if (isLiveGame) {
          if (roomId) {
            emitMakeMove({ roomId, move: movePayload });
          }
        } else {
          setIsBotThinking(true);
          const response = (await makeMoveInGameWithBot(
            roomId,
            movePayload,
          )) as MakeMoveResponse & Partial<GameOverResponse>;

          if (response.botMove) {
            chessRef.current.move(response.botMove);
            setLastMove(response.botMove);
            setMoveHistory((prev) => [...prev, response.botMove]);
          }

          if (response.isGameOver) {
            setWinner(determineWinner(response.winner));
          }
          syncGameState(response.fen);
        }

        return true;
      } catch (error) {
        console.error("Chess move error:", error);
        return false;
      } finally {
        setIsBotThinking(false);
      }
    },
    [
      gameStatus,
      roomId,
      isBotThinking,
      isLiveGame,
      playerColor,
      emitMakeMove,
      syncGameState,
      determineWinner,
    ],
  );

  const startBotGame = useCallback(
    async (chosenLevel: BotLevel, color: PlayerColor = "w") => {
      resetGame();
      try {
        const botColor: BotColor = color === "w" ? "white" : "black";
        const data = await startGameWithBot({
          color: botColor,
          level: chosenLevel,
        });

        setRoomId(data.roomId);
        setPlayerColor(color);
        setIsLiveGame(false);
        setLevel(chosenLevel);
        chessRef.current = new Chess(data.fen);
        setFen(data.fen);
        setMoveHistory(data.botMove ? [data.botMove] : []);
        setGameStatus("playing");
      } catch (err) {
        console.error("Failed to start bot game", err);
      }
    },
    [resetGame],
  );

  // isPlayerTurn is now computed properly instead of being hardcoded `true`
  const isPlayerTurn = isLiveGame
    ? chessRef.current.turn() === playerColor
    : true;

  return (
    <GameContext.Provider
      value={{
        fen,
        gameStatus,
        playerColor,
        isLiveGame,
        isBotThinking,
        lastMove,
        moveHistory,
        winner,
        level,
        socketStatus: connectionState,
        onDrop,
        startBotGame,
        startLiveGame,
        resetGame,
        setLevel,
        isPlayerTurn,
        showModal,
        setShowModal,
        startNewGame: startBotGame,
        setIsLiveGame,
        findMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

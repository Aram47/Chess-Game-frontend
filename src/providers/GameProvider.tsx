import React, { useCallback, useRef, useState } from "react";
import { GameContext } from "../context/GameContext";
import { Chess } from "chess.js";
import { startGameWithBot, makeMoveInGameWithBot } from "../api/game";
import type { PlayerColor, GameStatus, MoveType } from "../types/gameType";
import type { GameLevel, WinnerLabel } from "../types/playType";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chessRef = useRef(new Chess());
  const isStartingRef = useRef(false);

  const [roomId, setRoomId] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [playerColor, setPlayerColor] = useState<PlayerColor>("w");
  const [fen, setFen] = useState(chessRef.current.fen());
  const [level, setLevel] = useState<GameLevel>("medium");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null,
  );
  const [moveHistory, setMoveHistory] = useState<MoveType[]>([]);
  const [winner, setWinner] = useState<WinnerLabel>(null);
  const [showModal, setShowModal] = useState<string | null>(null);

  const resolveWinnerLabel = useCallback(
    (winnerColor?: "white" | "black" | "draw"): WinnerLabel => {
      if (winnerColor === "draw") return "draw";
      if (!winnerColor) return null;
      const playerSide = playerColor === "w" ? "white" : "black";
      return winnerColor === playerSide ? "you" : "bot";
    },
    [playerColor],
  );

  const syncState = useCallback((newFen?: string) => {
    const chess = chessRef.current;
    if (newFen) {
      chess.load(newFen);
    }

    setFen(chess.fen());

    if (chess.isCheckmate()) setGameStatus("checkmate");
    else if (chess.isStalemate()) setGameStatus("stalemate");
    else if (chess.isDraw()) setGameStatus("draw");
    else setGameStatus("playing");
  }, []);

  const chooseSide = useCallback(
    async (color: PlayerColor) => {
      if (isStartingRef.current) return;

      try {
        isStartingRef.current = true;
        setIsBotThinking(true);
        const mappedColor = color === "w" ? "white" : "black";
        const data = await startGameWithBot({ color: mappedColor, level });

        setRoomId(data.roomId);
        setPlayerColor(color);

        chessRef.current = new Chess(data.fen);

        if (data.botMove) {
          setLastMove({ from: data.botMove.from, to: data.botMove.to });
          setMoveHistory([data.botMove]);
        } else {
          setLastMove(null);
          setMoveHistory([]);
        }
        setWinner(null);

        setFen(data.fen);
        setGameStatus("playing");
      } catch (err) {
        console.error("Failed to start game", err);
        setGameStatus("idle");
      } finally {
        isStartingRef.current = false;
        setIsBotThinking(false);
      }
    },
    [level],
  );

  const onDrop = useCallback(
    async (source: string, target: string): Promise<boolean> => {
      if (gameStatus !== "playing" || !roomId || isBotThinking) return false;

      const chess = chessRef.current;
      const fenBeforeMove = chess.fen();
      const movePayload = { from: source, to: target, promotion: "q" };

      try {
        const move = chess.move(movePayload);
        if (!move) return false;

        setFen(chess.fen());
        setIsBotThinking(true);

        const response = await makeMoveInGameWithBot(roomId, movePayload);

        setMoveHistory((prev) => [...prev, movePayload]);

        if ("botMove" in response && response.botMove) {
          const botMove = response.botMove;
          setLastMove({ from: botMove.from, to: botMove.to });

          setMoveHistory((prev) => [...prev, botMove]);
        } else {
          setLastMove({ from: source, to: target });
        }

        if ("isGameOver" in response && response.isGameOver) {
          const winnerLabel = resolveWinnerLabel(response.winner);
          setWinner(winnerLabel);
          if (response.isCheckmate) {
            setGameStatus("checkmate");
          } else if (response.isDraw) {
            setGameStatus("draw");
          } else {
            setGameStatus("stalemate");
          }
        }

        if ("fen" in response && response.fen) {
          syncState(response.fen);
        } else {
          syncState();
        }

        return true;
      } catch (err) {
        console.error("Move failed", err);
        chess.load(fenBeforeMove);
        setFen(fenBeforeMove);
        return false;
      } finally {
        setIsBotThinking(false);
      }
    },
    [gameStatus, roomId, isBotThinking, resolveWinnerLabel, syncState],
  );

  const resetGame = useCallback(() => {
    chessRef.current = new Chess();
    setRoomId(null);
    setGameStatus("idle");
    setFen(chessRef.current.fen());
    setLastMove(null);
    setIsBotThinking(false);
    setMoveHistory([]);
    setWinner(null);
  }, []);

  const startNewGame = useCallback(
    async (color?: PlayerColor) => {
      resetGame();
      const side = color ?? (Math.random() > 0.5 ? "w" : "b");
      await chooseSide(side);
    },
    [chooseSide, resetGame],
  );

  const isPlayerTurn =
    gameStatus === "playing" && chessRef.current.turn() === playerColor;

  return (
    <GameContext.Provider
      value={{
        fen,
        gameStatus,
        playerColor,
        isBotThinking,
        isPlayerTurn,
        onDrop,
        startNewGame,
        resetGame,
        lastMove,
        moveHistory,
        winner,
        level,
        setLevel,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

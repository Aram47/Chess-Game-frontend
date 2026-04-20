import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import { BOARD_THEMES, type BoardTheme } from "./board-theme/boardThemes";
import { figurePieces } from "./chess-figures/FiguresChess";
import GameButtons from "./GameButtons";

import "./style.scss";

export const GameColumn = ({
  opponentName,
  playerName,
  fen,
  onDrop,
  isPlayerTurn,
  lastMove,
  gameStatus,
  resetGame,
  playerColor,
  level,
  isBotThinking,
  winner,
  boardTheme,
  startGameAgainstBot,
  setBoardTheme,
}: {
  opponentName?: string;
  playerName?: string;
  fen: string;
  onDrop: (source: string, target: string) => boolean | Promise<boolean>;
  isPlayerTurn: boolean;
  lastMove: { from: string; to: string } | null;
  gameStatus: string;
  resetGame: () => void;
  playerColor: "w" | "b";
  level: string;
  isBotThinking: boolean;
  winner: "you" | "bot" | "draw" | null;
  boardTheme?: BoardTheme;
  setBoardTheme: React.Dispatch<React.SetStateAction<BoardTheme>>;
  startGameAgainstBot: () => void;
}) => {
  const [timers, setTimers] = useState({ white: 600, black: 600 });

  const boardOrientation = playerColor === "w" ? "white" : "black";
  const playerSideLabel = playerColor === "w" ? "White" : "Black";
  const opponentSideLabel = playerColor === "w" ? "Black" : "White";
  const activeTurn = fen.split(" ")[1] === "b" ? "black" : "white";
  const theme = boardTheme ?? BOARD_THEMES[0];

  const squareStyles: Record<string, any> = {};
  if (lastMove) {
    squareStyles[lastMove.from] = {
      backgroundColor: "rgba(225, 200, 100, 0.4)",
    };
    squareStyles[lastMove.to] = { backgroundColor: "rgba(225, 200, 100, 0.6)" };
  }

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timer = setInterval(() => {
      setTimers((prev) => {
        if (prev[activeTurn] <= 0) return prev;
        return {
          ...prev,
          [activeTurn]: prev[activeTurn] - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, activeTurn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
      {/* Bot Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#1C1C1C] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#1C1C1C]">♚</span>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-gold capitalize">
              {opponentName || "Platform"} {`(${level})`}
            </h3>
            <p className="text-[#A39589] text-sm">{`Playing ${opponentSideLabel}`}</p>
          </div>
        </div>

        <p className="text-xl text-[#A39589] bg-[#0000004D] py-2 px-4 rounded-[10px]">
          {formatTime(
            timers[opponentSideLabel.toLowerCase() as "white" | "black"],
          )}
        </p>
      </div>

      {/* Board */}
      <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
        <div className="board">
          <Chessboard
            options={{
              position: fen,
              boardOrientation,
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                if (!targetSquare || !isPlayerTurn || isBotThinking)
                  return false;
                void onDrop(sourceSquare, targetSquare);
                return true;
              },
              pieces: figurePieces,
              squareStyles,
              darkSquareStyle: { backgroundColor: theme.dark, color: theme.light },
              lightSquareStyle: { backgroundColor: theme.light, color: theme.dark },
            }}
          />
        </div>

        {gameStatus !== "playing" && gameStatus !== "idle" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
            <h2 className="text-white text-2xl mb-4">
              {winner === "you"
                ? "YOU WIN"
                : winner === "bot"
                  ? "BOT WINS"
                  : winner === "draw"
                    ? "DRAW"
                    : gameStatus.toUpperCase()}
            </h2>
            <button
              onClick={resetGame}
              className="bg-[#E5CC7A] px-4 py-2 rounded"
            >
              New Game
            </button>
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-3xl">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#FFFFFF] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#FFFFFF]">♚</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white">{playerName || "Me"}</h3>
            <p className="text-[#A39589]">{`Playing ${playerSideLabel}`}</p>
          </div>
        </div>

        <p className="text-xl text-[#1C1C1C] bg-[#E5CC7A] py-2 px-4 rounded-[10px]">
          {formatTime(
            timers[playerSideLabel.toLowerCase() as "white" | "black"],
          )}
        </p>
      </div>
      <div className="bg-[#0000004D] rounded-xl justify-center p-4 text-sm text-[#F7EFD6] max-w-[70%] w-full mx-auto text-center">
        <p className="font-normal text-xs text-[#F7EFD6] ">
          {activeTurn === "white" ? "White to move" : "Black to move"}
        </p>
      </div>
      <GameButtons
        goFirst={startGameAgainstBot}
        onThemeChange={setBoardTheme}
      />
    </div>
  );
};

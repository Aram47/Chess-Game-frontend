import { Chessboard } from "react-chessboard";
import type { CSSProperties } from "react";
import {
  BOARD_THEMES,
  type BoardTheme,
} from "../../game/board-theme/boardThemes";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";

// import "./style.scss";
import AnalyzeButtons from "./AnalyzeButtons";

type AnalyzeControls = {
  goBack: () => void;
  goForward: () => void;
  goFirst: () => void;
  goLast: () => void;
};

export const ChessColumn = ({
  opponentName,
  playerName,
  fen,
  onDrop,
  isPlayerTurn,
  lastMove,
  gameStatus,
  resetGame,
  playerColor,
  isBotThinking,
  winner,
  boardTheme,
  analyzeControls,
}: {
  opponentName?: string;
  playerName?: string;
  fen: string;
  onDrop: (source: string, target: string) => boolean | Promise<boolean>;
  isPlayerTurn: boolean;
  lastMove: { from: string; to: string } | null;
  gameStatus: string;
  resetGame?: () => void;
  playerColor?: "w" | "b";
  isBotThinking?: boolean;
  winner: "you" | "bot" | "draw" | null;
  boardTheme?: BoardTheme;
  analyzeControls?: AnalyzeControls;
}) => {
  const winnerPlayer = winner ? "Win" : "Loss";
  const boardOrientation = playerColor === "w" ? "white" : "black";
  const playerSideLabel = playerColor === "w" ? "White" : "Black";
  const opponentSideLabel = playerColor === "w" ? "Black" : "White";
  const theme = boardTheme ?? BOARD_THEMES[0];

  const count = 40;
  const squareStyles: Record<string, CSSProperties> = {};
  if (lastMove) {
    squareStyles[lastMove.from] = {
      backgroundColor: "rgba(225, 200, 100, 0.4)",
    };
    squareStyles[lastMove.to] = { backgroundColor: "rgba(225, 200, 100, 0.6)" };
  }

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
              {opponentName || "Platform"}
            </h3>
            <p className="text-[#A39589] text-sm">{`Playing ${opponentSideLabel}`}</p>
          </div>
        </div>

        <p className="text-xl text-[#AD1414] bg-[#EF66661A] py-2 px-4 rounded-[10px]">
          {winnerPlayer}
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
              darkSquareStyle: {
                backgroundColor: theme.dark,
                color: theme.light,
              },
              lightSquareStyle: {
                backgroundColor: theme.light,
                color: theme.dark,
              },
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
      </div>
      <div className="flex items-center gap-x-3">
        <div className="bg-[#0000004D] rounded-[20px] justify-center p-4 text-sm text-[#F7EFD6] w-full mx-auto text-center">
          <p className="font-normal text-xs text-[#F7EFD6]">Moves 0/{count}</p>
        </div>
        <button className="w-[184px] bg-[linear-gradient(180deg,#E5CC7A_0%,#F4E09E_100%)] rounded-full text-[#1C1C1C] font-semibold text-sm hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] py-3">
          Analyze
        </button>
      </div>

      {analyzeControls && <AnalyzeButtons {...analyzeControls} />}
    </div>
  );
};

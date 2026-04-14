import type { CSSProperties } from "react";
import { Chessboard } from "react-chessboard";

interface GameColumnProps {
  fen: string | undefined;
  onMove: (move: { from: string; to: string; promotion: string }) => void;
  opponentName?: string;
  playerName?: string;
  gameStatus?: string;
  plyIndex: number;
  maxPly: number;
  squareStyles: Record<string, CSSProperties>;
}

export function GameColumn({
  fen,
  onMove,
  opponentName,
  playerName,
  gameStatus,
  plyIndex,
  maxPly,
  squareStyles,
}: GameColumnProps) {
  function onDrop(sourceSquare: string, targetSquare: string) {
    onMove({ from: sourceSquare, to: targetSquare, promotion: "q" });
    return true;
  }

  return (
    <div className="flex flex-col gap-4 border-[#CEB86E33] border rounded-xl p-8 font-barlow bg-[#FFFFFF0D]">
      {/* Opponent Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-[#1C1C1C] border-2 rounded-3xl flex items-center justify-center">
            <span className="text-[#1C1C1C] text-2xl">♚</span>
          </div>
          <div>
            {" "}
            <h3 className="text-gold font-normal leading-none">
              {opponentName || "Bot Name"}{" "}
            </h3>{" "}
            <p className="text-xs text-[#A39589] mt-1">
              Playing Black • AI • 40 Hard
            </p>{" "}
          </div>
        </div>
        {gameStatus && (
          <div className="bg-[#EF66661A] text-[#AD1414] px-4 py-1 rounded-lg text-sm">
            {gameStatus}
          </div>
        )}
      </div>

      {/* The Board */}
      <div className="overflow-hidden relative rounded-xl max-w-[600px] w-full mx-auto">
        <Chessboard
          position={fen ?? "start"}
          onPieceDrop={onDrop}
          customDarkSquareStyle={{ backgroundColor: "#769656" }}
          customLightSquareStyle={{ backgroundColor: "#EEEED2" }}
          customSquareStyles={squareStyles}
        />
      </div>

      {/* Player Info */}
      <div className="flex items-center bg-[#1C1C1C4D] px-4 py-3 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">♚</span>
          </div>
          <div>
            <h3 className="font-normal text-[#E5CC7A] leading-none">
              {playerName || "Me"}
            </h3>
            <p className="text-[10px] text-[#A39589] mt-1">Playing White</p>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto w-full bg-[#21201d] rounded-3xl flex items-center justify-center py-4 border border-[#E5CC7A1A]">
        <span className="text-[#F7EFD6] font-normal">
          Move {Math.floor(plyIndex / 2) + 1} / {Math.ceil(maxPly)}
        </span>
      </div>
    </div>
  );
}

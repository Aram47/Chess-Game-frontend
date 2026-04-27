import { Chess } from "chess.js";
import { useMemo, useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
// import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import type { MoveType } from "../../../types/gameType";
import { tryApplyMove } from "../../../utils/utils";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
import { Link } from "react-router-dom";
import leftIcon from "../../../assets/icons/analyze/left.svg";
// import SolveHistory from "./SolveHistory";

const SolveProblem = () => {
  const [branchMoves] = useState<MoveType[]>([]);
  const squareStyles: Record<string, CSSProperties> = {};

  const currentFen = useMemo(() => {
    const chess = new Chess();

    const applyMove = (move: string | MoveType) => {
      if (typeof move === "string") {
        try {
          chess.move(move);
        } catch {
          // Ignore invalid SAN/UCI entries from history.
        }
        return;
      }
      tryApplyMove(chess, move);
    };

    branchMoves.forEach((m) => applyMove(m));
    return chess.fen();
  }, [branchMoves]);

  return (
    <section className="w-full flex flex-col grow pt-[100px] pb-16 bg-[#1b1a17]">
      <header className="w-full text-center mb-8">
        <h1 className="text-6xl text-gold font-playfair font-black">
          Game Analysis
        </h1>
      </header>
      <div className="px-8 mb-8">
        <Link
          to="/"
          className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
        >
          <img src={leftIcon} alt="back" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
          <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 border-2 border-[#1C1C1C] flex items-center justify-center rounded-full">
                <span className="text-2xl text-[#1C1C1C]">♚</span>
              </div>
              <div className="flex flex-col ">
                <h3 className="text-gold capitalize">{"Platform"}</h3>
                {/* <p className="text-[#A39589] text-sm">{`Playing ${opponentSideLabel}`}</p> */}
              </div>
            </div>

            {/* <p className="text-xl text-[#AD1414] bg-[#EF66661A] py-2 px-4 rounded-[10px]">
          {winnerPlayer}
        </p> */}
          </div>
          <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
            <div className="board">
              <Chessboard
                options={{
                  position: currentFen,
                  pieces: figurePieces,
                  squareStyles,
                  lightSquareStyle: { background: "#EEEED2" },
                  darkSquareStyle: { background: "#769656" },
                }}
              />
            </div>
          </div>
        </div>
        {/* <SolveHistory
          currentFen={undefined}
          isTerminal={false}
          games={[]}
          setSelectedGameId={function (id: string): void {
            throw new Error("Function not implemented.");
          }}
          setPlyIndex={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
          currentPly={0}
          historyQuery={undefined}
          selectedGame={null}
        /> */}
      </div>
    </section>
  );
};

export default SolveProblem;

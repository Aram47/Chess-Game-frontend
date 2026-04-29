// import { Chess } from "chess.js";
// import { useMemo, useState, type CSSProperties } from "react";
// import { Chessboard } from "react-chessboard";
// // import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
// import type { MoveType } from "../../../types/gameType";
// import { tryApplyMove } from "../../../utils/utils";
// import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
// import { Link, useLocation } from "react-router-dom";
// import leftIcon from "../../../assets/icons/analyze/left.svg";
// import SolveHistory from "./SolveHistory";
// import { useProblemsQuery } from "../../../hooks/useProblemsHistory";
// import { DifficultyDots } from "../DifficultyDots";

// const SolveProblem = () => {
//   const historyProblem = useProblemsQuery();
//   const [branchMoves] = useState<MoveType[]>([]);
//   const squareStyles: Record<string, CSSProperties> = {};
//   const location = useLocation();
//   const { problem } = location.state || {};
//   const [plyIndex, setPlyIndex] = useState(0);
//   const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

//   const currentFen = useMemo(() => {
//     const chess = new Chess();

//     const applyMove = (move: string | MoveType) => {
//       if (typeof move === "string") {
//         try {
//           chess.move(move);
//         } catch {
//           // Ignore invalid SAN/UCI entries from history.
//         }
//         return;
//       }
//       tryApplyMove(chess, move);
//     };

//     branchMoves.forEach((m) => applyMove(m));
//     return chess.fen();
//   }, [branchMoves]);

//   if (!problem) {
//     return (
//       <div className="text-white text-center pt-20">
//         <p>Problem not found. Please select a problem from the list.</p>
//         <Link to="/" className="text-gold underline">
//           Go back to all problems
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full flex flex-col grow pt-[100px] pb-16 bg-[#1b1a17]">
//       <header className="w-full text-center mb-8">
//         <h1 className="text-6xl text-gold font-playfair font-black">
//           Mate in two moves
//         </h1>
//       </header>
//       <div className="px-8 mb-8">
//         <Link
//           to="/problems"
//           className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
//         >
//           <img src={leftIcon} alt="back" />
//         </Link>
//       </div>
//       <div className="flex gap-8 px-8">
//         <div className="w-[60%] flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
//           <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
//             <div className="w-full flex items-center justify-between gap-x-3">
//               <div className="flex flex-col text-[#A39589]">
//                 <span>{problem.tag}</span>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs">{problem.difficulty}</span>
//                 </div>
//               </div>
//               <DifficultyDots difficulty={problem.difficulty} />
//             </div>
//           </div>
//           <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
//             <div className="board">
//               <Chessboard
//                 options={{
//                   position: currentFen,
//                   pieces: figurePieces,
//                   squareStyles,
//                   lightSquareStyle: { background: "#EEEED2" },
//                   darkSquareStyle: { background: "#769656" },
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-x-3">
//             <div className="bg-[#0000004D] rounded-[20px] justify-center p-4 text-sm text-[#F7EFD6] w-full mx-auto text-center">
//               <p className="font-normal text-xs text-[#F7EFD6]">
//                 Current to Move
//               </p>
//             </div>
//             <button className="w-[184px] bg-[#7FC474] rounded-full text-[#1C1C1C] font-semibold text-sm hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] py-3 px-6 cursor-pointer">
//               Check Solution
//             </button>
//           </div>
//         </div>
//         <SolveHistory
//           currentFen={currentFen}
//           games={[]}
//           selectedGame={null}
//           setSelectedGameId={setSelectedGameId}
//           setPlyIndex={setPlyIndex}
//           historyQuery={historyProblem}
//         />
//       </div>
//     </section>
//   );
// };

// export default SolveProblem;

import { Chess } from "chess.js";
import { useMemo, useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import { tryApplyMove } from "../../../utils/utils";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
import { Link, useLocation } from "react-router-dom";
import {
  useProblemByIdQuery,
  useSubmitMoveMutation,
} from "../../../hooks/useProblemsHistory";
import SolveHistory from "./SolveHistory";
import { DifficultyDots } from "../DifficultyDots";

import leftIcon from "../../../assets/icons/analyze/left.svg";
import type { MoveType } from "../../../types/gameType";

const SolveProblem = () => {
  const location = useLocation();
  const { problem: stateProblem } = location.state || {};
  const submitMoveMutation = useSubmitMoveMutation();
  const { data: problem, isLoading } = useProblemByIdQuery(stateProblem?.id);

  const [branchMoves] = useState<MoveType[]>([]);
  const squareStyles: Record<string, CSSProperties> = {};
  const [_, setPlyIndex] = useState(0);

  const handleMove = (from: string, to: string) => {
    submitMoveMutation.mutate({
      id: problem!.id,
      move: { from, to },
    });
  };
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

  if (!problem) {
    console.log("prbl", problem);
    return (
      <div className="text-white text-center pt-20">
        <p>Problem not found. Please select a problem from the list.</p>
        <Link to="/" className="text-gold underline">
          Go back to all problems
        </Link>
      </div>
    );
  }

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <section className="w-full flex flex-col grow pt-[100px] pb-16 bg-[#1b1a17]">
      <header className="w-full text-center mb-8">
        <h1 className="text-6xl text-gold font-playfair font-black">
          Mate in two moves
        </h1>
      </header>
      <div className="px-8 mb-8">
        <Link
          to="/problems"
          className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
        >
          <img src={leftIcon} alt="back" />
        </Link>
      </div>
      <div className="flex gap-8 px-8">
        <div className="w-[60%] flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
          <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
            <div className="w-full flex items-center justify-between gap-x-3">
              <div className="flex flex-col text-[#A39589]">
                <span>{problem.tag}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{problem.difficultyLevel}</span>
                </div>
              </div>
              <DifficultyDots difficulty={problem.difficultyLevel} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
            <div className="board">
              <Chessboard
                position={currentFen}
                onPieceDrop={(source: string, target: string) => {
                  handleMove(source, target);
                  return true;
                }}
                customPieces={figurePieces}
                customSquareStyles={squareStyles}
                customLightSquareStyle={{ background: "#EEEED2" }}
                customDarkSquareStyle={{ background: "#769656" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="bg-[#0000004D] rounded-[20px] justify-center p-4 text-sm text-[#F7EFD6] w-full mx-auto text-center">
              <p className="font-normal text-xs text-[#F7EFD6]">
                Current to Move
              </p>
            </div>
            <button className="w-[184px] bg-[#7FC474] rounded-full text-[#1C1C1C] font-semibold text-sm hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] py-3 px-6 cursor-pointer">
              Check Solution
            </button>
          </div>
        </div>
        <SolveHistory
          currentFen={currentFen}
          moveHistory={problem?.solutionMoves || branchMoves}
          setPlyIndex={setPlyIndex}
          historyQuery={{ isPending: isLoading } as any}
        />
      </div>
    </section>
  );
};

export default SolveProblem;

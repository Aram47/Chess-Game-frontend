// import { useState, type CSSProperties } from "react";
// import { Chessboard } from "react-chessboard";
// import { figurePieces } from "../../helpers/chess-figures/FiguresChess";
// import type { ChessProblem } from "../../types/problems";
// import { DifficultyDots } from "./DifficultyDots";

// interface ProblemCardProps {
//   problem: ChessProblem;
//   onSolve: (problem: ChessProblem) => void;
// }

// export const ProblemCard: React.FC<ProblemCardProps> = ({
//   problem,
//   onSolve,
// }) => {
//   const squareStyles: Record<string, CSSProperties> = {};
//   const [onHover, setOnHover] = useState(false);

//   return (
//     <div
//       className={`overflow-hidden rounded-[20px] bg-[#2E2E2E]
//         py-4 px-6 border border-[#CEB86E33] hover:border-[rgba(206,184,110,0.28)]hover:-translate-y-0.5 transition-all duration-200 ease-in-out ${onHover === true ? "hover:scale-105 z-10 -translate-y-0.5" : "scale-100"}`}
//     >
//       <div className="flex flex-col gap-y-3">
//         <div
//           className="absolute z-10 w-full flex items-center justify-between transition-all duration-300 ease-in-out"
//           style={{
//             top: onHover ? "70%" : "20px",
//             transform: onHover ? "translateY(-50%)" : "translateY(0)",
//             paddingRight: "50px",
//           }}
//         >
//           <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#A39589]">
//             {problem.category.name}
//           </span>
//           <DifficultyDots difficulty={problem.difficultyLevel} />
//         </div>

//         <div className="h-6" />

//         <div
//           className="transition-all duration-300 ease-in-out board-wrapper"
//           style={{
//             transform: onHover ? "translateY(-35px)" : "translateY(0)",
//           }}
//         >
//           <Chessboard
//             position={problem.fen}
//             squareStyles={squareStyles}
//             boardOrientation="white"
//             customDarkSquareStyle={{ backgroundColor: "#B58863" }}
//             customLightSquareStyle={{ backgroundColor: "#F0D9B5" }}
//             pieces={figurePieces}
//             animationDuration={0}
//           />
//         </div>

//         <div className="flex items-baseline justify-between">
//           <span className="text-sm font-semibold text-[#F7EFD6] truncate">
//             {problem.description}
//           </span>
//           <span className="text-xs text-[#A39589] whitespace-nowrap shrink-0">
//             {problem.difficultyLevel}
//           </span>
//         </div>

//         <button
//           type="button"
//           onClick={() => onSolve(problem)}
//           onMouseEnter={() => setOnHover(true)}
//           onMouseLeave={() => setOnHover(false)}
//           className="w-full py-2.5 px-6 text-[12px] font-medium tracking-[0.03em] text-[#CFCFCF] cursor-pointer rounded-[100px] border border-[#CEB86E33] bg-transparent
//           transition-all duration-[180ms] ease-in-out hover:bg-[rgba(206,184,110,0.1)]
//           hover:border-[rgba(206,184,110,0.65)]"
//         >
//           Solve Problem
//         </button>
//       </div>
//     </div>
//   );
// };




import { useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import { figurePieces } from "../../helpers/chess-figures/FiguresChess";
import { DifficultyDots } from "./DifficultyDots";
import type { Problem } from "../../types/problemType";

interface ProblemCardProps {
  problem: Problem;
  onSolve: (problem: Problem) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onSolve,
}) => {
  const squareStyles: Record<string, CSSProperties> = {};
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-[20px] bg-[#2E2E2E]
        py-4 px-6 border border-[#CEB86E33] hover:border-[rgba(206,184,110,0.28)]hover:-translate-y-0.5 transition-all duration-200 ease-in-out ${onHover === true ? "hover:scale-105 z-10 -translate-y-0.5" : "scale-100"}`}
    >
      <div className="flex flex-col gap-y-3">
        <div
          className="absolute z-10 w-full flex items-center justify-between transition-all duration-300 ease-in-out"
          style={{
            top: onHover ? "70%" : "20px",
            transform: onHover ? "translateY(-50%)" : "translateY(0)",
            paddingRight: "50px",
          }}
        >
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#A39589]">
            {problem.tag}
          </span>
          <DifficultyDots difficulty={problem.difficulty} />
        </div>

        <div className="h-6" />

        <div
          className="transition-all duration-300 ease-in-out board-wrapper"
          style={{
            transform: onHover ? "translateY(-35px)" : "translateY(0)",
          }}
        >
          <Chessboard
            position={problem.fen}
            squareStyles={squareStyles}
            boardOrientation="white"
            customDarkSquareStyle={{ backgroundColor: "#B58863" }}
            customLightSquareStyle={{ backgroundColor: "#F0D9B5" }}
            pieces={figurePieces}
            animationDuration={0}
          />
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[#F7EFD6] truncate">
            {problem.tag}
          </span>
          <span className="text-xs text-[#A39589] whitespace-nowrap shrink-0">
            {problem.difficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSolve(problem)}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          className="w-full py-2.5 px-6 text-[12px] font-medium tracking-[0.03em] text-[#CFCFCF] cursor-pointer rounded-[100px] border border-[#CEB86E33] bg-transparent
          transition-all duration-[180ms] ease-in-out hover:bg-[rgba(206,184,110,0.1)]
          hover:border-[rgba(206,184,110,0.65)]"
        >
          Solve Problem
        </button>
      </div>
    </div>
  );
};


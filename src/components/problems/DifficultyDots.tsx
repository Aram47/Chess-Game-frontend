// import type { ProblemDifficultyLevel } from "../../types/problems";

// interface DifficultyDotsProps {
//   difficulty: ProblemDifficultyLevel;
// }

// interface DifficultyMeta {
//   activeColor: string;
//   dots: number;
// }

// const DIFFICULTY_CONFIG: Record<ProblemDifficultyLevel, DifficultyMeta> = {
//   Easy: { activeColor: "#5ab552", dots: 1 },
//   Medium: { activeColor: "#CEB86E", dots: 2 },
//   Hard: { activeColor: "#d04040", dots: 3 },
// };

// export const DifficultyDots: React.FC<DifficultyDotsProps> = ({
//   difficulty,
// }) => {
//   const { activeColor, dots } = DIFFICULTY_CONFIG[difficulty];

//   return (
//     <div className="flex items-center gap-1">
//       {Array.from({ length: 3 }, (_, i) => (
//         <span
//           key={i}
//           className="block w-[4px] h-[11px] rounded-full shrink-0"
//           style={{
//             background: i < dots ? activeColor : "rgba(255,255,255,0.13)",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

import type { Difficulty } from "../../types/problemType";

interface DifficultyDotsProps {
  difficulty: Difficulty;
}

interface DifficultyMeta {
  activeColor: string;
  dots: number;
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyMeta> = {
  Beginner: { activeColor: "#5ab552", dots: 1 },
  Intermediate: { activeColor: "#CEB86E", dots: 2 },
  Advanced: { activeColor: "#d04040", dots: 3 },
  Expert: { activeColor: "#FF0000", dots: 4 },
};

export const DifficultyDots: React.FC<DifficultyDotsProps> = ({
  difficulty,
}) => {
  const { activeColor, dots } = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className="block w-[4px] h-[11px] rounded-full shrink-0"
          style={{
            background: i < dots ? activeColor : "rgba(255,255,255,0.13)",
          }}
        />
      ))}
    </div>
  );
};

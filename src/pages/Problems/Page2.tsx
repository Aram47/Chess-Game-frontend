import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { ProblemCard } from "../../components/problems/ProblemCard";
import SelectProblems from "../../components/problems/SelectProblems";
import {
  DIFFICULTY_MAP,
  type Difficulty,
  type ProblemTheme,
} from "../../types/problemType";
import type { GetProblemsParams } from "../../types/problems";
import { useProblemsQuery } from "../../hooks/useProblemsHistory";
import { useTranslation } from "../../hooks/useTranslation";
import type { ChessProblem } from "../../types/problems";

import "../../assets/css/style.scss";
import { useTheme } from "../../context/ThemeContext";

const ProblemsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [themeFilter, setThemeFilter] = useState<ProblemTheme | "All">("All");
  const [diffFilter, setDiffFilter] = useState<"All" | Difficulty>("All");

  const queryParams = useMemo((): GetProblemsParams => {
    const params: GetProblemsParams = { page: 1, limit: 50 };
    if (diffFilter !== "All") {
      params.difficultyLevel = DIFFICULTY_MAP[diffFilter];
    }
    return params;
  }, [diffFilter]);

  const { data, isLoading, isError, refetch } = useProblemsQuery(queryParams);

  const filteredProblems = useMemo(() => {
    const list = data?.data ?? [];
    if (themeFilter === "All") return list;
    return list.filter(
      (p) => p.category?.name?.toLowerCase() === themeFilter.toLowerCase(),
    );
  }, [data?.data, themeFilter]);

  const handleSolve = (problem: ChessProblem): void => {
    navigate(`/problems/${problem.id}`, { state: { problem } });
  };

  return (
    <section className="min-h-screen text-[#e8e2d0] px-6 py-8 ">
      <header className="text-center mb-6">
        <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] tracking-[0.02em] text-[#E5CC7A]">
          {t("problems_title")}
        </h1>
      </header>

      <SelectProblems
        themeFilter={themeFilter}
        setThemeFilter={setThemeFilter}
        diffFilter={diffFilter}
        setDiffFilter={setDiffFilter}
      />

      <section
        className={`w-full grid grid-cols-1fr sm:grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)]
      lg:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,250px)] justify-between gap-6 p-4 rounded-[36px] ${theme === "dark" ? "bg-[#FFFFFF0D]" : "bg-[#FFFDFA]"}`}
      >
        {isLoading && (
          <div className="col-span-full flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#CEB86E]" />
          </div>
        )}

        {isError && !isLoading && (
          <div className="col-span-full flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-[#A39589]">{t("could_not_load_puzzles")}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-full border border-[#CEB86E] px-6 py-2 text-sm text-[#E5CC7A] hover:bg-[#E5CC7A1A]"
            >
              {t("retry")}
            </button>
          </div>
        )}

        {!isLoading &&
          !isError &&
          filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onSolve={handleSolve}
            />
          ))}

        {!isLoading && !isError && filteredProblems.length === 0 && (
          <p className="col-span-full text-center text-[#8a8478] mt-3 text-[15px]">
            {t("no_problems_match")}
          </p>
        )}
      </section>

      {!isLoading && !isError && filteredProblems.length > 0 && (
        <div
          className={`col-span-full text-center mt-3 text-[15px] ${theme === "dark" ? "text-[#8a8478]" : "text-[#5E6470]"}`}
        >
          {t("showing_problems", {
            shown: filteredProblems.length,
            total: data?.total ?? filteredProblems.length,
          })}
        </div>
      )}
    </section>
  );
};

export default ProblemsPage;

// import React, { useState } from "react";

// import { ProblemCard } from "../../components/problems/ProblemCard";
// import {
//   type Problem,
//   type ProblemTheme,
//   type Difficulty,
// } from "../../types/problemType";
// import SelectProblems from "../../components/problems/SelectProblems";

// import "../../assets/css/style.scss";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../../context/ThemeContext";

// const PROBLEMS: Problem[] = [
//   {
//     id: 1,
//     name: "Mate in two moves",
//     tag: "Tactical",
//     difficulty: "Beginner",
//     fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
//   },
//   {
//     id: 2,
//     name: "Back rank mate",
//     tag: "Tactical",
//     difficulty: "Intermediate",
//     fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
//   },
//   {
//     id: 3,
//     name: "Rook endgame",
//     tag: "Endgame",
//     difficulty: "Advanced",
//     fen: "8/8/4k3/8/3K4/8/8/4R3 w - - 0 1",
//   },
//   {
//     id: 4,
//     name: "Queen sacrifice",
//     tag: "Tactical",
//     difficulty: "Expert",
//     fen: "r1b1k2r/pp3ppp/2p1p3/3n4/3P4/2NB1N2/PP3PPP/R1BQK2R w KQkq - 0 1",
//   },
//   {
//     id: 5,
//     name: "Pin and win",
//     tag: "Endgame",
//     difficulty: "Beginner",
//     fen: "rnbqk2r/ppp2ppp/4pn2/3p4/3P1B2/2N1P3/PPP2PPP/R2QKB1R w KQkq - 0 1",
//   },
//   {
//     id: 6,
//     name: "Pawn breakthrough",
//     tag: "Tactical",
//     difficulty: "Intermediate",
//     fen: "8/ppp5/8/PPP5/8/8/8/8 w - - 0 1",
//   },
//   {
//     id: 7,
//     name: "Discovered attack",
//     tag: "Opening",
//     difficulty: "Expert",
//     fen: "r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
//   },
//   {
//     id: 8,
//     name: "Knight fork",
//     tag: "Tactical",
//     difficulty: "Beginner",
//     fen: "r1bqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
//   },
//   {
//     id: 9,
//     name: "King and pawn ending",
//     tag: "Positional",
//     difficulty: "Advanced",
//     fen: "8/8/3k4/3p4/3P4/3K4/8/8 w - - 0 1",
//   },
//   {
//     id: 10,
//     name: "Sicilian defence",
//     tag: "Opening",
//     difficulty: "Expert",
//     fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
//   },
// ];

// const ProblemsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [themeFilter, setThemeFilter] = useState<"All" | ProblemTheme>("All");
//   const [diffFilter, setDiffFilter] = useState<"All" | Difficulty>("All");
//   const { theme } = useTheme();

//   const filteredProblems: Problem[] = PROBLEMS.filter((p) => {
//     const matchTheme = themeFilter === "All" || p.tag === themeFilter;
//     const matchDiff = diffFilter === "All" || p.difficulty === diffFilter;
//     return matchTheme && matchDiff;
//   });

//   const handleSolve = (problem: Problem): void => {
//     console.log("Opening problem:", problem.name);
//     navigate("/problems/id", { state: { problem } });
//   };

//   return (
//     <section className="min-h-screen text-[#e8e2d0] px-6 py-8 font-barlow">
//       <header className="text-center mb-6">
//         <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] tracking-[0.02em] text-[#E5CC7A]">
//           Problems
//         </h1>
//       </header>
//       <SelectProblems
//         themeFilter={themeFilter}
//         setThemeFilter={(value: string) =>
//           setThemeFilter(value as "All" | ProblemTheme)
//         }
//         diffFilter={diffFilter}
//         setDiffFilter={(value: "All" | Difficulty) =>
//           setDiffFilter(value as "All" | Difficulty)
//         }
//       />
//       {/* ── Problems grid ── */}
//       <section
//         className={`w-full grid grid-cols-1fr sm:grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)]
//       lg:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,250px)] justify-between gap-6 p-4 rounded-[36px] ${theme === "dark" ? "bg-[#FFFFFF0D]" : "bg-[#FFFDFA]"}`}
//       >
//         {filteredProblems.map((problem) => (
//           <ProblemCard
//             key={problem.id}
//             problem={problem}
//             onSolve={handleSolve}
//           />
//         ))}
//       </section>
//       {filteredProblems.length ? (
//         <div
//           className={`col-span-full text-center mt-3 text-[15px] ${theme === "dark" ? "text-[#8a8478]" : "text-[#5E6470]"}`}
//         >
//           Showing {filteredProblems.length} problems from 100
//         </div>
//       ) : (
//         <p className="col-span-full text-center text-[#8a8478] mt-3 text-[15px]">
//           No problems match your filters.
//         </p>
//       )}
//     </section>
//   );
// };

// export default ProblemsPage;

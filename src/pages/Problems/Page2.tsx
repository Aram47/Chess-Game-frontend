import React, { useEffect, useMemo, useState } from "react";

import { ProblemCard } from "../../components/problems/ProblemCard";
import SelectProblems from "../../components/problems/SelectProblems";

import { useNavigate } from "react-router-dom";
import { useProblems } from "../../context/ProblemsContext";
import type {
  ChessProblem,
  ProblemDifficultyLevel,
} from "../../types/problems";
import "../../assets/css/style.scss";

const ProblemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [themeFilter, setThemeFilter] = useState<"All" | string>("All");
  const [diffFilter, setDiffFilter] = useState<"All" | ProblemDifficultyLevel>(
    "All",
  );
  const { problems, fetchProblems, isLoading, setFen } = useProblems();

  useEffect(() => {
    void fetchProblems();
  }, [fetchProblems]);

  const filteredProblems: ChessProblem[] = useMemo(
    () =>
      problems.filter((p) => {
        const matchTheme =
          themeFilter === "All" || p.category.name === themeFilter;
        const matchDiff =
          diffFilter === "All" || p.difficultyLevel === diffFilter;
        return matchTheme && matchDiff;
      }),
    [diffFilter, problems, themeFilter],
  );

  console.log('prob', problems)

  const handleSolve = (problem: ChessProblem): void => {
    setFen(problem.fen);
    console.log("Opening problem:", problem.id);
    navigate("/problems/id");
  };

  return (
    <section className="min-h-screen text-[#e8e2d0] px-6 py-8 font-barlow">
      <header className="text-center mb-6">
        <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] tracking-[0.02em] text-[#E5CC7A]">
          Problems
        </h1>
      </header>

      <SelectProblems
        themeFilter={themeFilter}
        setThemeFilter={setThemeFilter}
        diffFilter={diffFilter}
        setDiffFilter={setDiffFilter}
      />

      {/* ── Problems grid ── */}
      <section
        className="w-full grid grid-cols-1fr sm:grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)] 
      lg:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,250px)] justify-between gap-6 bg-[#FFFFFF0D] p-4 rounded-[36px]"
      >
        {isLoading && (
          <p className="col-span-full text-center text-[#8a8478]">
            Loading problems...
          </p>
        )}
        {filteredProblems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onSolve={handleSolve}
          />
        ))}
      </section>
      {filteredProblems.length ? (
        <div className="col-span-full text-center text-[#8a8478] mt-3 text-[15px]">
          Showing {filteredProblems.length} problems
        </div>
      ) : (
        <p className="col-span-full text-center text-[#8a8478] mt-3 text-[15px]">
          No problems match your filters.
        </p>
      )}
    </section>
  );
};

export default ProblemsPage;

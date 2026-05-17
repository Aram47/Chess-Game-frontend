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
import type { ChessProblem } from "../../types/problems";

import "../../assets/css/style.scss";

const ProblemsPage: React.FC = () => {
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

      <section
        className="w-full grid grid-cols-1fr sm:grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)] 
      lg:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,250px)] justify-between gap-6 bg-[#FFFFFF0D] p-4 rounded-[36px]"
      >
        {isLoading && (
          <div className="col-span-full flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#CEB86E]" />
          </div>
        )}

        {isError && !isLoading && (
          <div className="col-span-full flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-[#A39589]">Could not load puzzles.</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-full border border-[#CEB86E] px-6 py-2 text-sm text-[#E5CC7A] hover:bg-[#E5CC7A1A]"
            >
              Retry
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
            No problems match your filters.
          </p>
        )}
      </section>

      {!isLoading && !isError && filteredProblems.length > 0 && (
        <div className="col-span-full text-center text-[#8a8478] mt-3 text-[15px]">
          Showing {filteredProblems.length}
          {data?.total != null ? ` of ${data.total}` : ""} problems
        </div>
      )}
    </section>
  );
};

export default ProblemsPage;

import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "../../../hooks/useTranslation";
import { Loader2 } from "lucide-react";
import type { ProfileStats } from "../../../types/profile";
import type { CompletedProblemsStats } from "../../../api/snapshot";
import type { StringKey } from "../../../constants/strings";

interface ResultsProps {
  stats: ProfileStats;
  problemStats?: CompletedProblemsStats;
  problemsLoading?: boolean;
}

const Results = ({ stats, problemStats, problemsLoading }: ResultsProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const formatData = (
    gameStats: ProfileStats,
    puzzles?: CompletedProblemsStats,
  ) => {
    const totalGames = gameStats.wins + gameStats.losses + gameStats.draws || 0;

    const getPercent = (val: number, total: number) =>
      total > 0 ? `${((val / total) * 100).toFixed(1)}%` : "0%";

    const puzzleTotal = puzzles?.total ?? gameStats.solvedProblemsCount;
    const easy = puzzles?.easy ?? 0;
    const medium = puzzles?.medium ?? 0;
    const hard = puzzles?.hard ?? 0;

    return [
      {
        id: 1,
        titleKey: "match_results" as StringKey,
        total: totalGames,
        totalLabelKey: "total_games" as StringKey,
        stats: [
          {
            labelKey: "wins" as StringKey,
            statKey: "wins",
            count: gameStats.wins,
            percentage: getPercent(gameStats.wins, totalGames),
            color: "#307D24",
          },
          {
            labelKey: "losses" as StringKey,
            statKey: "losses",
            count: gameStats.losses,
            percentage: getPercent(gameStats.losses, totalGames),
            color: "#AD1414",
          },
          {
            labelKey: "draws" as StringKey,
            statKey: "draws",
            count: gameStats.draws,
            percentage: getPercent(gameStats.draws, totalGames),
            color: "#676767",
          },
        ],
      },
      {
        id: 2,
        titleKey: "problems_solved" as StringKey,
        total: puzzleTotal,
        totalLabelKey: "total_solved" as StringKey,
        stats: [
          {
            labelKey: "easy" as StringKey,
            statKey: "easy",
            count: easy,
            percentage: getPercent(easy, puzzleTotal),
            color: "#307D24",
          },
          {
            labelKey: "medium" as StringKey,
            statKey: "medium",
            count: medium,
            percentage: getPercent(medium, puzzleTotal),
            color: "#B7A362",
          },
          {
            labelKey: "hard" as StringKey,
            statKey: "hard",
            count: hard,
            percentage: getPercent(hard, puzzleTotal),
            color: "#AD1414",
          },
        ],
      },
    ];
  };

  const dynamicData = formatData(stats, problemStats);

  return (
    <section className={`flex flex-col gap-y-4 w-full border border-[#CEB86E33] rounded-[20px] p-6 h-full bg-[var(--bg)]`}>
      {problemsLoading && (
        <div className="flex items-center gap-2 text-[#A39589] text-sm mb-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("updating_puzzle_stats")}
        </div>
      )}
      {dynamicData.map((section, index) => (
        <div key={section.id} className="flex flex-col gap-y-8">
          <h4
            className={`text-lg font-semibold ${isDark ? "text-[#F0EDE8]" : "text-[#1C1C1C]"}`}
          >
            {t(section.titleKey)}
          </h4>
          <div className="flex gap-x-12 items-center py-4">
            <div className="relative w-[160px] h-[160px] flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(102, 112, 128, 0) 0deg, #57E341 234deg, #57E341 360deg)",
                  }}
                />
              </div>
              <div
                className={`absolute inset-[8px] rounded-full z-10 bg-[var(--bg)]"}`}
              />
              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-light text-white leading-none">
                  {section.total}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  {t(section.totalLabelKey)}
                </p>
              </div>
            </div>
            <div className="flex flex-1 justify-between pr-8">
              {section.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span
                      className={`text-sm font-semibold ${isDark ? "text-[#CFCFCF]" : "text-[#1C1C1C]"} `}
                    >
                      {t(stat.labelKey)}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-x-2">
                    <span
                      className={`${
                        ["easy", "medium", "hard"].includes(stat.statKey)
                          ? "text-[#307D24]"
                          : stat.statKey === "losses"
                            ? "text-[#AD1414]"
                            : "text-[#787878]"
                      } text-md font-semibold`}
                    >
                      {stat.count}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({stat.percentage})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {index === dynamicData.length - 1 ? null : (
            <div className="w-full h-px border-t border-[#CEB86E33]" />
          )}
        </div>
      ))}
    </section>
  );
};

export default Results;

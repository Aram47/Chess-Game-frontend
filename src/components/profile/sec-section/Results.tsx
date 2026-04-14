import type { ProfileStats } from "../../../types/profile";

interface ResultsProps {
  stats: ProfileStats;
}

const Results = ({ stats }: ResultsProps) => {
  // Helper to calculate percentages and format data for the UI
  const formatData = (stats: ProfileStats) => {
    const totalGames = stats.wins + stats.losses + stats.draws || 0;

    const getPercent = (val: number, total: number) =>
      total > 0 ? ((val / total) * 100).toFixed(1) + "%" : "0%";

    return [
      {
        id: 1,
        title: "Match Results",
        total: totalGames,
        totalLabel: "Total Games",
        stats: [
          {
            label: "Wins",
            count: stats.wins,
            percentage: getPercent(stats.wins, totalGames),
            color: "#307D24",
          },
          {
            label: "Losses",
            count: stats.losses,
            percentage: getPercent(stats.losses, totalGames),
            color: "#AD1414",
          },
          {
            label: "Draws",
            count: stats.draws,
            percentage: getPercent(stats.draws, totalGames),
            color: "#676767",
          },
        ],
      },
      {
        id: 2,
        title: "Problems Solved",
        total: stats.solvedProblemsCount,
        totalLabel: "Total Solved",
        stats: [
          {
            label: "Easy",
            count: stats.solvedProblemsCount,
            percentage: "100%",
            color: "#307D24",
          },

          {
            label: "Medium",
            count: stats.solvedProblemsCount,
            percentage: getPercent(stats.losses, totalGames),
            color: "#B7A362",
          },
          {
            label: "Hard",
            count: stats.solvedProblemsCount,
            percentage: getPercent(stats.draws, totalGames),
            color: "#AD1414",
          },
        ],
      },
    ];
  };

  const dynamicData = formatData(stats);

  return (
    <section className="flex flex-col gap-y-4 w-full bg-[#1C1C1C] border border-[#CEB86E33] rounded-2xl p-6 h-full">
      {dynamicData.map((section, index) => (
        <div key={section.id} className="flex flex-col gap-y-8">
          <h2 className="text-lg font-semibold text-[#F0EDE8]">{section.title}</h2>
          <div className="flex gap-x-12 items-center py-4">
            {/* LEFT SIDE: The Doughnut Chart */}
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

              <div className="absolute inset-[8px] bg-[#1C1C1C] rounded-full z-10" />

              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-light text-white leading-none">
                  {section.total}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  {section.totalLabel}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Stats Labels */}
            <div className="flex flex-1 justify-between pr-8">
              {section.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="text-sm font-medium text-gray-300">
                      {stat.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-x-2">
                    <span
                      className={`${
                        ["Easy", "Medium", "Hard"].includes(stat.label)
                          ? "text-[#307D24]"
                          : stat.label === "Losses"
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
            <div className="w-full h-px border-t border-[#CEB86E33]"></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Results;

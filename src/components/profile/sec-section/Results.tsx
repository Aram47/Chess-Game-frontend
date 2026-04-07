const resultData = [
  {
    id: 1,
    title: "Match Results",
    total: 342,
    totalLabel: "Total Games",
    stats: [
      { label: "Wins", count: 229, percentage: "67.0%", color: "#57E341" },
      { label: "Losses", count: 78, percentage: "22.8%", color: "#7F0E0E" },
      { label: "Draws", count: 35, percentage: "10.2%", color: "#676767" },
    ],
  },
  {
    id: 2,
    title: "Problems Solved",
    total: 587,
    totalLabel: "Total Solved",
    stats: [
      { label: "Easy", count: 342, percentage: "58.3%", color: "#57E341" },
      { label: "Medium", count: 156, percentage: "26.6%", color: "#B7A362" },
      { label: "Hard", count: 89, percentage: "15.2%", color: "#7F0E0E" },
    ],
  },
];

const Results = () => {
  return (
    <section className="flex flex-col gap-y-4 w-full bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-6 h-full">
      {resultData.map((section, index) => (
        <div key={section.id} className="flex flex-col gap-y-8">
          <h2>{section.title}</h2>
          <div className="flex gap-x-12 items-center py-4">
            {/* LEFT SIDE: The Doughnut Chart */}
            <div className="relative w-[160px] h-[160px] flex items-center justify-center shrink-0">
              {/* LAYER 1: The Color Tracks */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(102, 112, 128, 0) 0deg, #57E341 234deg, #57E341 360deg)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, #676767 -76.15deg, rgba(102, 112, 128, 0) 178.71deg, #676767 268.24deg, #676767 283.85deg, rgba(102, 112, 128, 0) 538.71deg)",
                    mixBlendMode: "lighten",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 270deg at 50% 50%, #7F0E0E -19.85deg, rgba(102, 112, 128, 0) 267.44deg, #7F0E0E 340.15deg, rgba(102, 112, 128, 0) 627.44deg)",
                    mixBlendMode: "lighten",
                  }}
                />
              </div>

              {/* LAYER 2: Inner Hole */}
              <div className="absolute inset-[8px] bg-[#1C1C1C] rounded-full z-10" />

              {/* LAYER 3: Center Text */}
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
                      className={`${stat.label === "Wins" ? "text-[#307D24]" : stat.label === "Losses" ? "text-[#AD1414]" : stat.label === "Easy" ? "text-[#307D24]" : stat.label === "Medium" ? "text-[#B7A362]" : stat.label === "Hard" ? "text-[#AD1414]" : "text-[#787878]"} text-md font-semibold`}
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
          {index === resultData.length - 1 ? null : (
            <div className="w-full h-px border-t-1 solid bg-[#CEB86E33]"></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Results;

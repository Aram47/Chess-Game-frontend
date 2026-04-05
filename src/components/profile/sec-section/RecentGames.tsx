import { SectionWrapper } from "../../../hooks/sectionWrapper";

const recentGamesData = [
  {
    opp: "GM Hikaru",
    result: "win",
    moves: 42,
    time: "2 minutes ago",
  },
  {
    opp: "IM Anna_Chess",
    result: "loss",
    moves: 38,
    time: "45 minutes ago",
  },
  {
    opp: "GM Levy",
    result: "draw",
    moves: 42,
    time: "2 hours ago",
  },
];

const RecentGames = () => {
  return (
    <SectionWrapper title="Recent Games" extra="Your latest matches">
      <div className="flex flex-col gap-4">
        {recentGamesData.map((game, i) => (
          <div
            key={i}
            className="bg-[#232323] py-2.5 px-3 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5CC7A] flex items-center justify-center text-xs">
                H
              </div>
              <div>
                <p className="text-sm font-normal text-[#F7F7F7]">{game.opp}</p>
                <p className="text-xs font-normal text-[#676767]">2848 • 10+5</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <span
                className={`text-[10px] px-2 py-1 rounded capitalize font-normal ${
                  game.result === "win"
                    ? "bg-[#7FC4741A] text-[#307D24]"
                    : game.result === "loss"
                      ? "bg-[#EF66661A] text-[#AD1414]"
                      : "bg-[#6767671A] text-[#787878]"
                }`}
              >
                {game.result}
              </span>
              <div className="text-right flex items-center gap-x-3">
                <p className="text-sm text-[#787878]">{game.moves} moves</p>
                <p className="text-[10px] text-[#676767]">{game.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default RecentGames;

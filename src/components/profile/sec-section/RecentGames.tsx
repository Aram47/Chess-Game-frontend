import { SectionWrapper } from "../../../hooks/sectionWrapper";

export interface Game {
  opponentName?: string;
  elo?: number;
  mode?: string;
  result: "win" | "loss" | "draw";
  moves: number;
  time?: string;
}

interface RecentGamesProps {
  games: Game[];
}

const RecentGames = ({ games }: RecentGamesProps) => {
  return (
    <SectionWrapper title="Recent Games" extra="Your latest matches">
      <div className="flex flex-col gap-4">
        {!games || games.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No games played yet.</p>
        ) : (
          games.map((game, i) => (
            <div
              key={i}
              className="bg-[#232323] py-2.5 px-3 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E5CC7A] flex items-center justify-center text-[#1c1c1c] font-bold">
                  {game.opponentName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-normal text-[#F7F7F7]">
                    {game.opponentName || "Unknown"}
                  </p>
                  <p className="text-xs font-normal text-[#676767]">
                    {game.elo ?? "----"} • {game.mode || "Blitz"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <span
                  className={`text-[10px] px-2 py-1 rounded capitalize font-medium ${
                    game.result === "win"
                      ? "bg-[#7FC4741A] text-[#307D24]"
                      : game.result === "loss"
                        ? "bg-[#EF66661A] text-[#AD1414]"
                        : "bg-[#6767671A] text-[#787878]"
                  }`}
                >
                  {game.result}
                </span>
                <div className="text-right">
                  <p className="text-sm text-[#787878]">{game.moves} moves</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default RecentGames;

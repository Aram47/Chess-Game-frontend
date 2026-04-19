import { SectionWrapper } from "../../../helpers/sectionWrapper";
import gamesIcon from "../../../assets/icons/profile/games.svg";
import type { Game } from "../../../types/gameType";

interface RecentGamesProps {
  games: Game[];
}
const RecentGames = ({ games }: RecentGamesProps) => {
  return (
    <SectionWrapper
      title="Recent Games"
      extra={games.length > 0 ? "Your latest matches" : undefined}
      games={games}
    >
      <div className="flex flex-col justify-center">
        {!games || games.length === 0 ? (
          <>
            <div className="flex flex-col items-center text-center font-barlow h-full">
              <div className="bg-[#E5CC7A14] border-1 border-[#E5CC7A26] rounded-full p-2.5">
                <img
                  src={gamesIcon}
                  alt="games-icon"
                  className="w-[18px] h-[18px]"
                />
              </div>
              <div className="mt-2 flex flex-col gap-y-2 text-[#F0EDE8]">
                <h2>No Recent Games Yet</h2>
                <p className="text-[#888888] text-sm">
                  Your recent game history will appear here once you start
                  playing.Jump into a match to get started!
                </p>
              </div>
            </div>
            <button className="flex justify-center mx-auto mt-7 border-1 border-[#E5CC7A] py-2.5 px-6 rounded-[100px] cursor-pointer transition-all duration-500 hover:-translate-y-[5px] hover:bg-[rgba(229,204,122,0.3)]">
              <span className="">Start a Game</span>
            </button>
          </>
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
                <div>
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
            </div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default RecentGames;

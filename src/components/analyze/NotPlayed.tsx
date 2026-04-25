import type { GameHistoryItem } from "../../types/gameType";
import { AnalyzeIcon } from "./helpers/AnalyzeIcon";

interface NotPlayedProps {
  games: GameHistoryItem[];
}

const NotPlayed = ({ games }: NotPlayedProps) => {
  return (
    <section className="w-full h-full flex flex-col grow bg-[#1b1a17] font-barlow">
      <div className="bg-[#262421] border border-[#CEB86E33] flex flex-col rounded-[20px] p-8 min-h-[670px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#E5CC7A] font-normal text-xl">Game History</h2>
          <span className="text-[#A39589]">0 games</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-2">
          <AnalyzeIcon games={games} />
          <p className="text-[#EEDDA6] font-medium text-xl">
            No Games Saved Yet
          </p>
          <p className="text-[#A39589] text-md font-normal">
            Play some games to see them here!
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotPlayed;

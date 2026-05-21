import type { GameHistoryItem } from "../../types/gameType";
import { useTranslation } from "../../hooks/useTranslation";
import { AnalyzeIcon } from "./helpers/AnalyzeIcon";

interface NotPlayedProps {
  games: GameHistoryItem[];
}

const NotPlayed = ({ games }: NotPlayedProps) => {
  const { t } = useTranslation();

  return (
    <section className="w-full h-full flex flex-col grow bg-[#1b1a17] ">
      <div className="bg-[#262421] border border-[#CEB86E33] flex flex-col rounded-[20px] p-8 min-h-[670px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#E5CC7A] font-normal text-xl">
            {t("game_history")}
          </h2>
          <span className="text-[#A39589]">
            {t("games_count", { count: 0 })}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-2">
          <AnalyzeIcon games={games} />
          <p className="text-[#EEDDA6] font-medium text-xl">
            {t("no_games_saved")}
          </p>
          <p className="text-[#A39589] text-md font-normal">
            {t("play_some_games")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotPlayed;

import type { GameHistoryItem } from "../../types/gameType";
import { useTranslation } from "../../hooks/useTranslation";
import { AnalyzeIcon } from "./helpers/AnalyzeIcon";
import { useTheme } from "../../context/ThemeContext";

interface NotPlayedProps {
  games: GameHistoryItem[];
}

const NotPlayed = ({ games }: NotPlayedProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section className="w-full h-full flex flex-col grow">
      <div
        className={`${theme === "dark" ? "bg-[#262421]" : "bg-[var(--bg)]"} border border-[#CEB86E33] flex flex-col rounded-[20px] p-8 min-h-[670px]`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`${theme === "dark" ? "text-[#E5CC7A]" : "text-[#da7756]"} font-normal text-xl`}
          >
            {t("game_history")}
          </h2>
          <span className="text-[#A39589]">
            {t("games_count", { count: 0 })}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-2">
          <AnalyzeIcon games={games} theme={theme} />
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

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import gamesIcon from "../../../assets/icons/profile/games.svg";
import type { GameSummary } from "../../../types/gameType";
import { useAuth } from "../../../context/AuthContext";
import {
  mapRecentGameToSummary,
  type RecentGameSnapshot,
} from "../../../lib/profile/mapRecentGame";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTheme } from "../../../context/ThemeContext";

interface RecentGamesProps {
  games: RecentGameSnapshot[];
}

const RecentGames = ({ games }: RecentGamesProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();

  const summaries: GameSummary[] = useMemo(() => {
    if (!user?.id || !games?.length) return [];
    return games.map((g) => mapRecentGameToSummary(g, user.id));
  }, [games, user?.id]);

  return (
    <SectionWrapper
      title={t("recent_games")}
      extra={summaries.length > 0 ? t("your_latest_matches") : undefined}
      games={summaries}
    >
      <div className="flex flex-col justify-center">
        {summaries.length === 0 ? (
          <>
            <div className="flex flex-col items-center text-center  h-full">
              <div className="bg-[#E5CC7A14] border border-[#E5CC7A26] rounded-full p-2.5">
                <img src={gamesIcon} alt="" className="w-[18px] h-[18px]" />
              </div>
              <div className="mt-2 flex flex-col gap-y-2 text-[#F0EDE8]">
                <h2>{t("no_recent_games")}</h2>
                <p className="text-[#888888] text-sm">
                  {t("recent_games_empty")}
                </p>
              </div>
            </div>
            <Link
              to="/play"
              className="flex justify-center mx-auto mt-7 border border-[#E5CC7A] py-2.5 px-6 rounded-[100px] transition-all duration-500 hover:-translate-y-[5px] hover:bg-[rgba(229,204,122,0.3)] text-[#CFCFCF] text-sm"
            >
              {t("start_game")}
            </Link>
          </>
        ) : (
          summaries.map((game, i) => (
            <div
              key={i}
              className={`py-2.5 px-3 rounded-xl flex items-center justify-between mb-2 ${theme === "dark" ? "bg-[#252525]" : "bg-[#FAF8F6]"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[#1c1c1c] font-normal shrink-0 ${theme === "dark" ? "bg-[#E5CC7A]" : "bg-[#DA775680]"}`}
                >
                  {game.opponentName?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${theme === "dark" ? "text-[#F7F7F7]" : "text-[#1C1C1C]"}`}
                  >
                    {game.opponentName}
                  </p>
                  <p className="text-xs font-normal text-[#676767]">
                    {game.mode}
                    {game.time ? ` · ${game.time}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-3 shrink-0">
                <span
                  className={`text-[10px] px-2 py-1 rounded capitalize font-medium ${
                    game.result === "win"
                      ? "bg-[#7FC4741A] text-[#307D24]"
                      : game.result === "loss"
                        ? "bg-[#EF66661A] text-[#AD1414]"
                        : "bg-[#6767671A] text-[#787878]"
                  }`}
                >
                  {t(
                    game.result === "draw"
                      ? "draw_label"
                      : (game.result as "win" | "loss"),
                  )}
                </span>
                <p className="text-sm text-[#787878]">
                  {t("moves_count", { count: game.moves })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default RecentGames;

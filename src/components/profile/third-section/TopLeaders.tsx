import { Loader2 } from "lucide-react";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import { useProfile } from "../../../context/ProfileContext";
import { buildEloLeaderboard } from "../../../lib/profile/buildEloLeaderboard";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTheme } from "../../../context/ThemeContext";

const TopLeaders = () => {
  const { t } = useTranslation();
  const { profile, friends, loading } = useProfile();
  const { theme } = useTheme();

  if (loading || !profile) {
    return (
      <div className="w-full flex flex-1 items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-[#CEB86E]" />
      </div>
    );
  }

  const leaderList = buildEloLeaderboard(profile, friends);

  return (
    <div className="w-full flex flex-1 items-center gap-x-8">
      <SectionWrapper title={t("top_players_elo")}>
        {leaderList.length === 0 ? (
          <p className="text-sm text-[#A39589] py-6 text-center">
            {t("add_friends_compare")}
          </p>
        ) : (
          <div className="flex-1 flex flex-col gap-2">
            {leaderList.map((leader) => (
              <div
                key={leader.id}
                className={`p-4 rounded-xl flex items-center justify-between ${
                  leader.isCurrentUser ? "ring-1 ring-[#E5CC7A]/40" : ""
                } ${theme === "dark" ? "bg-[#232323]" : ""}`}
                style={
                  theme !== "dark"
                    ? {
                        background:
                          "linear-gradient(90deg, #FBF1EE 0%, #FBF4F1 26.1%, #FAF8F6 70.7%)",
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`font-bold w-4 shrink-0 ${leader.isCurrentUser ? "text-[#C46B4D]" : "text-gray-500"}`}
                  >
                    {leader.rank}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${theme === "dark" ? "text-[#F7F7F7]" : "text-[#1C1C1C]"}`}
                    >
                      {leader.name}
                    </p>
                    <p
                      className={`text-[10px] uppercase truncate ${theme === "dark" ? "text-[#676767]" : "text-[#5E6470]"}`}
                    >
                      @{leader.username}
                      {leader.isCurrentUser ? t("you_suffix") : ""}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold tabular-nums shrink-0 ${theme === "dark" ? "text-[#F0EDE8]" : "text-[#1C1C1C]"}`}
                >
                  {leader.elo}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export default TopLeaders;

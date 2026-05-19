import { Loader2 } from "lucide-react";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import { useProfile } from "../../../context/ProfileContext";
import { buildEloLeaderboard } from "../../../lib/profile/buildEloLeaderboard";
import { useTranslation } from "../../../hooks/useTranslation";

const TopLeaders = () => {
  const { t } = useTranslation();
  const { profile, friends, loading } = useProfile();

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
                className={`bg-[#232323] p-4 rounded-xl flex items-center justify-between ${
                  leader.isCurrentUser ? "ring-1 ring-[#E5CC7A]/40" : ""
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-gray-500 font-bold w-4 shrink-0">
                    {leader.rank}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{leader.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase truncate">
                      @{leader.username}
                      {leader.isCurrentUser ? t("you_suffix") : ""}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#F0EDE8] tabular-nums shrink-0">
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

import { Loader2 } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { useProblemStats } from "../../hooks/useProblemStats";
import FirstSection from "../../components/profile/first-section";
import SecondSection from "../../components/profile/sec-section";
import ThirdSection from "../../components/profile/third-section";
import type { RecentGameSnapshot } from "../../lib/profile/mapRecentGame";
import { useTranslation } from "../../hooks/useTranslation";

const ProfileDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { profile, friends, loading, refreshProfile } = useProfile();
  const {
    data: problemStats,
    isLoading: problemsLoading,
    isError: problemsError,
    refetch: refetchProblemStats,
  } = useProblemStats(Boolean(profile));

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#E5CC7A]">
        <Loader2 className="h-8 w-8 animate-spin" aria-label={t("loading_profile")} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-[#A39589]">{t("could_not_load_profile")}</p>
        <button
          type="button"
          onClick={() => void refreshProfile()}
          className="rounded-full border border-[#CEB86E] px-6 py-2 text-sm text-[#E5CC7A]"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  const recentGames = (profile.recentGames ?? []) as RecentGameSnapshot[];

  return (
    <div className="w-full min-h-screen p-8 text-white font-barlow mx-auto flex flex-col gap-y-8 mb-10 mt-13">
      {problemsError && (
        <p className="text-sm text-amber-500/90 text-center">
          {t("puzzle_breakdown_unavailable")}{" "}
          <button
            type="button"
            className="underline"
            onClick={() => void refetchProblemStats()}
          >
            {t("retry")}
          </button>
        </p>
      )}
      <FirstSection />
      <SecondSection
        recentGames={recentGames}
        stats={profile.stats}
        problemStats={problemStats}
        problemsLoading={problemsLoading}
      />
      <ThirdSection friends={friends} />
    </div>
  );
};

export default ProfileDashboard;

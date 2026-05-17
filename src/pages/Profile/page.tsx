import { Loader2 } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { useProblemStats } from "../../hooks/useProblemStats";
import FirstSection from "../../components/profile/first-section";
import SecondSection from "../../components/profile/sec-section";
import ThirdSection from "../../components/profile/third-section";
import type { RecentGameSnapshot } from "../../lib/profile/mapRecentGame";

const ProfileDashboard: React.FC = () => {
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
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading profile" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-[#A39589]">Could not load your profile.</p>
        <button
          type="button"
          onClick={() => void refreshProfile()}
          className="rounded-full border border-[#CEB86E] px-6 py-2 text-sm text-[#E5CC7A]"
        >
          Retry
        </button>
      </div>
    );
  }

  const recentGames = (profile.recentGames ?? []) as RecentGameSnapshot[];

  return (
    <div className="w-full min-h-screen p-8 text-white font-barlow mx-auto flex flex-col gap-y-8 mb-10 mt-13">
      {problemsError && (
        <p className="text-sm text-amber-500/90 text-center">
          Puzzle breakdown unavailable.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => void refetchProblemStats()}
          >
            Retry
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

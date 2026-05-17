import RecentGames from "./RecentGames";
import Results from "./Results";
import type { ProfileStats } from "../../../types/profile";
import type { CompletedProblemsStats } from "../../../api/snapshot";
import type { RecentGameSnapshot } from "../../../lib/profile/mapRecentGame";

interface SecondSectionProps {
  recentGames: RecentGameSnapshot[];
  stats: ProfileStats;
  problemStats?: CompletedProblemsStats;
  problemsLoading?: boolean;
}

const SecondSection = ({
  recentGames,
  stats,
  problemStats,
  problemsLoading,
}: SecondSectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8">
      <RecentGames games={recentGames} />
      <Results
        stats={stats}
        problemStats={problemStats}
        problemsLoading={problemsLoading}
      />
    </div>
  );
};

export default SecondSection;

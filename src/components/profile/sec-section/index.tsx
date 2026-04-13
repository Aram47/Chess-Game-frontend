import RecentGames from "./RecentGames";
import Results from "./Results";
import type { ProfileStats } from "../../../types/profile";

interface SecondSectionProps {
  recentGames: any[];
  stats: ProfileStats;
}

const SecondSection = ({ recentGames, stats }: SecondSectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8">
      <RecentGames games={recentGames} />
      <Results stats={stats} />
    </div>
  );
};

export default SecondSection;

import { useProfile } from "../../hooks/ProfileContext";
import FirstSection from "../../components/profile/first-section";
import SecondSection from "../../components/profile/sec-section";
import ThirdSection from "../../components/profile/third-section";

const ProfileDashboard: React.FC = () => {
  const { profile, friends, loading } = useProfile();

  if (loading || !profile) {
    return <div className="text-white p-8">Loading dashboard...</div>;
  }

  return (
    <div className="w-full min-h-screen p-8 text-white font-barlow mx-auto flex flex-col gap-y-8 mb-10 mt-13">
      <FirstSection />
      <SecondSection recentGames={profile.recentGames} stats={profile.stats} />
      <ThirdSection friends={friends} />
    </div>
  );
};

export default ProfileDashboard;

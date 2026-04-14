import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { getMyProfile } from "../../api/profile";
import { listFriends } from "../../api/friends";
import type { MyProfile, FriendshipRow } from "../../types/profile";

import FirstSection from "../../components/profile/first-section";
import SecondSection from "../../components/profile/sec-section";
import ThirdSection from "../../components/profile/third-section";

const ProfileDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [friends, setFriends] = useState<FriendshipRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, friendsData] = await Promise.all([
          getMyProfile(),
          listFriends(),
        ]);
        setProfile(profileData);
        setFriends(friendsData);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !profile) {
    return <div className="text-white p-8">Loading dashboard...</div>;
  }

  return (
    <div className="w-full min-h-screen p-8 text-white font-barlow mx-auto flex flex-col gap-y-8 mb-10 mt-13">
      {/* Pass profile to the first section */}
      <FirstSection user={user!} profile={profile} />

      {/* Pass recent games to the second section */}
      <SecondSection recentGames={profile.recentGames} stats={profile.stats} />

      {/* Pass friends to the third section */}
      <ThirdSection friends={friends} />
    </div>
  );
};

export default ProfileDashboard;

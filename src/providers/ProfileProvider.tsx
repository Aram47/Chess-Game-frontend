import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/profile";
import { listFriends } from "../api/friends";
import type { MyProfile, FriendshipRow } from "../types/profile";
import { ProfileContext } from "../hooks/ProfileContext";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [friends, setFriends] = useState<FriendshipRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

    const fetchData = async () => {
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

//   const fetchData = async () => {
//     try {
//       const data = await getMyProfile();
//       setProfile(data);
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const friendsList = async () => {
//     try {
//       const data = await listFriends();
//       console.log('friends data', data)
//       setFriends(data);
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     friendsList();
//   }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const updateProfile = async (data: Partial<MyProfile>) => {
    await updateMyProfile(data);
    await fetchData();
  };

  return (
    <ProfileContext.Provider
      value={{
        isOpen,
        setIsOpen,
        profile,
        friends,
        loading,
        refreshProfile: fetchData,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

import { useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import { useFriends } from "../hooks/useFriends";
import { useProfileApi, useUpdateProfile } from "../hooks/useProfile";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const { data: profile, isLoading: profileLoading, refetch } = useProfileApi({
    enabled: isLoggedIn,
  });
  const { data: friends = [], isLoading: friendsLoading } = useFriends({
    enabled: isLoggedIn,
  });
  const updateMutation = useUpdateProfile();

  const loading = profileLoading || friendsLoading;

  const updateProfile = async (data: { username?: string; email?: string }) => {
    await updateMutation.mutateAsync(data);
  };

  const refreshProfile = async () => {
    await refetch();
  };

  return (
    <ProfileContext.Provider
      value={{
        isOpen,
        setIsOpen,
        profile: profile ?? null,
        friends,
        loading,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

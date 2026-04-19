import { useState } from "react";
import { ProfileContext } from "../hooks/ProfileContext";
import { useFriends } from "../helpers/useFriends";
import { useProfileApi, useUpdateProfile } from "../helpers/useProfile";

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile, isLoading: profileLoading, refetch } = useProfileApi();
  const { data: friends = [], isLoading: friendsLoading } = useFriends();
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

import { createContext, useContext } from "react";
import type { ProfileContextType } from "../types/profile";

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext); 
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
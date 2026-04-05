export interface AchievementProps {
  icon: React.ReactNode;
  label: string;
  count?: string;
  unlocked: boolean;
}
export interface FriendProps {
  name: string;
  username: string;
  elo: number;
  status: "online" | "in game" | "offline";
}
export interface LeaderProps {
  rank: number;
  name: string;
  country: string;
  elo: number;
  change: number;
}
export interface GameProps {
  opponent: string;
  elo: string;
  result: "win" | "loss" | "draw";
  moves: number;
  time: string;
}

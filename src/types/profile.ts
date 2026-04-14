export type AuthProvider = "local" | "google";

export interface ProfileStats {
  solvedProblemsCount: number;
  playedGames: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface PublicProfile {
  id: number;
  username: string;
  name: string;
  surname: string;
  elo: number;
  stats: ProfileStats;
  recentGames: Record<string, unknown>[];
  createdAt: string;
}

export interface MyProfile extends PublicProfile {
  email: string;
  authProvider: AuthProvider;
  canChangePassword: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export type SendFriendRequestBody = { friendId: number } | { username: string };

export type UserSearchHit = FriendSnippet;

export interface FriendSnippet {
  id: number;
  username: string;
  name: string;
  surname: string;
  elo: number;
}

export interface FriendshipRow {
  id: number;
  status: "pending" | "accepted" | "rejected";
  requestedBy: number;
  createdAt: string;
  otherUser: FriendSnippet;
}

export interface PendingFriendships {
  incoming: FriendshipRow[];
  outgoing: FriendshipRow[];
}

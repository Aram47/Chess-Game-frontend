import type { MyProfile, FriendshipRow } from "../../types/profile";

export interface EloLeaderRow {
  rank: number;
  id: number;
  name: string;
  username: string;
  elo: number;
  isCurrentUser: boolean;
}

export function buildEloLeaderboard(
  profile: MyProfile,
  friends: FriendshipRow[],
  limit = 10,
): EloLeaderRow[] {
  const rows = new Map<number, EloLeaderRow>();

  rows.set(profile.id, {
    rank: 0,
    id: profile.id,
    name: `${profile.name} ${profile.surname}`.trim(),
    username: profile.username,
    elo: profile.elo,
    isCurrentUser: true,
  });

  for (const friendship of friends) {
    const { otherUser } = friendship;
    rows.set(otherUser.id, {
      rank: 0,
      id: otherUser.id,
      name: `${otherUser.name} ${otherUser.surname}`.trim(),
      username: otherUser.username,
      elo: otherUser.elo,
      isCurrentUser: false,
    });
  }

  const sorted = [...rows.values()].sort((a, b) => b.elo - a.elo).slice(0, limit);

  return sorted.map((row, index) => ({
    ...row,
    rank: index + 1,
  }));
}

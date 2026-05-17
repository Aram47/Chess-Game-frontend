import type { GameSummary } from "../../types/gameType";

export interface RecentGameSnapshot {
  _id?: string;
  white?: string;
  black?: string;
  isBot?: boolean;
  winnerColor?: string;
  winnerId?: string;
  allMoves?: unknown[];
  finishedAt?: number;
  isDraw?: boolean;
}

export function mapRecentGameToSummary(
  game: RecentGameSnapshot,
  currentUserId: string,
): GameSummary {
  const userId = currentUserId.trim();
  const isWhite = String(game.white ?? "") === userId;
  const isBlack = String(game.black ?? "") === userId;

  let opponentName = "Opponent";
  if (game.isBot) {
    opponentName = "AI Bot";
  } else if (isWhite) {
    opponentName =
      game.black && game.black !== "bot" ? `Player ${game.black}` : "Opponent";
  } else if (isBlack) {
    opponentName =
      game.white && game.white !== "bot" ? `Player ${game.white}` : "Opponent";
  }

  let result: GameSummary["result"] = "draw";
  if (game.isDraw || game.winnerColor === "draw") {
    result = "draw";
  } else if (game.winnerId != null && String(game.winnerId) === userId) {
    result = "win";
  } else if (game.winnerColor === "white" && isWhite) {
    result = "win";
  } else if (game.winnerColor === "black" && isBlack) {
    result = "win";
  } else if (game.winnerColor && game.winnerColor !== "draw") {
    result = "loss";
  }

  const moves = Array.isArray(game.allMoves) ? game.allMoves.length : 0;
  const time =
    typeof game.finishedAt === "number"
      ? new Date(game.finishedAt).toLocaleDateString()
      : undefined;

  return {
    opponentName,
    mode: game.isBot ? "vs AI" : "PvP",
    result,
    moves,
    time,
  };
}

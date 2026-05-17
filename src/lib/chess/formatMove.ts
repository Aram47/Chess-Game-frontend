import type { MoveType } from "../../types/gameType";

/** Display a move as square notation, e.g. "e2 → e4". */
export function formatMoveSquares(from: string, to: string): string {
  return `${from} → ${to}`;
}

export function isWhitePly(plyIndex: number): boolean {
  return plyIndex % 2 === 0;
}

export function moveNumberForPly(plyIndex: number): number {
  return Math.floor(plyIndex / 2) + 1;
}

export function normalizeMove(move: MoveType | string): MoveType | null {
  if (typeof move === "string") {
    const trimmed = move.trim();
    if (trimmed.length < 4) return null;
    return { from: trimmed.slice(0, 2), to: trimmed.slice(2, 4) };
  }
  if (move?.from && move?.to) return move;
  return null;
}

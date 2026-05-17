import { Chess, type Square } from "chess.js";

export type BoardPlayerColor = "w" | "b";

export function isLegalMoveOnFen(
  fen: string,
  from: string,
  to: string,
  promotion: "q" | "r" | "b" | "n" = "q",
): boolean {
  try {
    const chess = new Chess(fen);
    const move = chess.move({ from, to, promotion });
    return move !== null;
  } catch {
    return false;
  }
}

export function getLegalTargetSquares(fen: string, from: string): string[] {
  try {
    const chess = new Chess(fen);
    return chess.moves({ square: from as Square, verbose: true }).map((m) => m.to);
  } catch {
    return [];
  }
}

export function isPlayersPieceOnFen(
  fen: string,
  square: string,
  playerColor: BoardPlayerColor,
): boolean {
  try {
    const chess = new Chess(fen);
    const piece = chess.get(square as Square);
    return piece?.color === playerColor;
  } catch {
    return false;
  }
}

export function pieceTypeColor(pieceType: string): BoardPlayerColor | null {
  if (pieceType.startsWith("w")) return "w";
  if (pieceType.startsWith("b")) return "b";
  return null;
}

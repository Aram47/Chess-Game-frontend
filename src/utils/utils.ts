import { Chess } from "chess.js";

export type Move = { from: string; to: string; promotion?: string };

export function createChessFromFen(fen?: string): Chess {
  const chess = new Chess();
  if (fen && fen.trim() !== "") {
    try {
      chess.load(fen);
    } catch (error) {
      console.warn("Invalid FEN, using starting position:", error);
    }
  }
  return chess;
}

export function getFen(chess: Chess): string {
  return chess.fen();
}

export function getSideToMove(fen: string): "white" | "black" {
  const parts = fen.split(" ");
  return parts[1] === "w" ? "white" : "black";
}

export function makeMove(
  chess: Chess,
  from: string,
  to: string,
  promotion?: string,
): Move | null {
  try {
    const move = chess.move({ from, to, promotion: promotion as string });
    if (move) {
      return { from, to, promotion };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Convert a move to UCI format { from, to }
 */
// export function moveToUCI(move: Move): { from: string; to: string } {
//   return { from: move.from, to: move.to };
// }

// /**
//  * Get all legal moves for a position
//  */
// export function getLegalMoves(chess: Chess): Array<{ from: string; to: string }> {
//   const moves = chess.moves({ verbose: true });
//   return moves.map((move) => ({
//     from: move.from,
//     to: move.to,
//   }));
// }

// /**
//  * Check if a move is legal
//  */
// export function isLegalMove(chess: Chess, from: string, to: string): boolean {
//   try {
//     const moves = chess.moves({ square: from, verbose: true });
//     return moves.some((move) => move.to === to);
//   } catch {
//     return false;
//   }
// }

export function legalMoveFromSquares(
  chess: Chess,
  from: string,
  to: string,
): Move | null {
  try {
    const candidates = chess
      .moves({ verbose: true })
      .filter((m) => m.from === from && m.to === to);
    if (candidates.length === 0) return null;
    const chosen = candidates.find((m) => m.promotion === "q") ?? candidates[0];
    const out: Move = { from, to };
    if (chosen.promotion) out.promotion = chosen.promotion;
    return out;
  } catch {
    return null;
  }
}

function normalizeMove(move: Move): {
  from: string;
  to: string;
  promotion?: string;
} {
  const from = move.from.toLowerCase();
  const to = move.to.toLowerCase();
  const promotion = move.promotion?.toLowerCase();
  return promotion ? { from, to, promotion } : { from, to };
}

export function tryApplyMove(chess: Chess, move: Move): boolean {
  try {
    const normalized = normalizeMove(move);
    const result = chess.move(normalized);
    return result !== null;
  } catch {
    return false;
  }
}

/**
 * Undo last move
 */
export function undoMove(chess: Chess): boolean {
  const move = chess.undo();
  return move !== null;
}

/**
 * Reset to starting position
 */
export function resetBoard(chess: Chess): void {
  chess.reset();
}

/**
 * Check if position is checkmate
 */
export function isCheckmate(chess: Chess): boolean {
  return chess.isCheckmate();
}

/**
 * Check if position is stalemate
 */
export function isStalemate(chess: Chess): boolean {
  return chess.isStalemate();
}

/**
 * Check if position is check
 */
export function isCheck(chess: Chess): boolean {
  return chess.isCheck();
}

import { useRef, useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { type GameHistoryItem } from "../../api/history";
import { tryApplyMove } from "../../utils/utils";
import type { MoveType } from "../../types/gameType";
import { pieces } from "../../components/main/chess-section/piecesChess";

import style from "./style.module.scss";

type BoardOrientation = "white" | "black";

interface GameColumnProps {
  plyIndex: number;
  setPlyIndex: React.Dispatch<React.SetStateAction<number>>;
  branchMoves: MoveType[];
  setBranchMoves: React.Dispatch<React.SetStateAction<MoveType[]>>;
  selectedGame: GameHistoryItem | null;
  setSelectedGameId: React.Dispatch<React.SetStateAction<string | null>>;
  games: GameHistoryItem[];
  orientation: BoardOrientation;
  bestMove?: { from: string; to: string; san: string } | null;
}

function recordedMovesList(game: GameHistoryItem | null): MoveType[] {
  return game?.allMoves ?? [];
}

export function computeVariationSans(
  selectedGame: GameHistoryItem | null,
  plyIndex: number,
  branchMoves: MoveType[],
): string[] {
  if (branchMoves.length === 0) return [];
  const chess = new Chess();
  if (selectedGame) {
    const recorded = recordedMovesList(selectedGame);
    for (let i = 0; i < plyIndex; i++) {
      if (!tryApplyMove(chess, recorded[i])) return [];
    }
  }
  const labels: string[] = [];
  for (const move of branchMoves) {
    if (!tryApplyMove(chess, move)) break;
    const hist = chess.history({ verbose: true });
    const last = hist[hist.length - 1];
    labels.push(last ? last.san : `${move.from}-${move.to}`);
  }
  return labels;
}

export function computePosition(
  selectedGame: GameHistoryItem | null,
  plyIndex: number,
  branchMoves: MoveType[],
): {
  currentFen: string | undefined;
  isTerminal: boolean;
} {
  if (!selectedGame) {
    const chess = new Chess();
    for (const move of branchMoves) {
      if (!tryApplyMove(chess, move)) break;
    }
    return { currentFen: chess.fen(), isTerminal: chess.isGameOver() };
  }
  const recorded = recordedMovesList(selectedGame);
  const chess = new Chess();
  for (let i = 0; i < plyIndex; i++) {
    if (!tryApplyMove(chess, recorded[i])) {
      return { currentFen: chess.fen(), isTerminal: chess.isGameOver() };
    }
  }
  for (const move of branchMoves) {
    if (!tryApplyMove(chess, move)) break;
  }
  return { currentFen: chess.fen(), isTerminal: chess.isGameOver() };
}

function buildMoveArgs(
  vc: Chess,
  from: string,
  to: string,
): { from: string; to: string; promotion?: string } | null {
  type Sq = Parameters<Chess["get"]>[0];
  const piece = vc.get(from as Sq);
  if (!piece) return null;
  const rank = to[1];
  const needsPromotion =
    piece.type === "p" &&
    ((piece.color === "w" && rank === "8") ||
      (piece.color === "b" && rank === "1"));
  const args: { from: string; to: string; promotion?: string } = { from, to };
  if (needsPromotion) args.promotion = "q";
  return args;
}

function tryLegalMove(fen: string, from: string, to: string): MoveType | null {
  const vc = new Chess(fen);
  const turn = vc.turn();
  type Sq = Parameters<Chess["get"]>[0];
  const piece = vc.get(from as Sq);
  if (!piece || piece.color !== turn) return null;
  const args = buildMoveArgs(vc, from, to);
  if (!args) return null;
  try {
    const result = vc.move(args);
    if (!result) return null;
    const move: MoveType = { from, to };
    if (args.promotion) move.promotion = args.promotion;
    return move;
  } catch {
    return null;
  }
}

export function GameColumn({
  plyIndex,
  branchMoves,
  setBranchMoves,
  selectedGame,
  setSelectedGameId,
  games,
  orientation,
  bestMove,
}: GameColumnProps) {
  const [tapFrom, setTapFrom] = useState<string | null>(null);

  const prevKeyRef = useRef<string>("");
  const currentKey = `${selectedGame?._id ?? ""}-${plyIndex}-${orientation}`;
  if (prevKeyRef.current !== currentKey) {
    prevKeyRef.current = currentKey;
    if (tapFrom !== null) setTapFrom(null);
  }

  // Auto-select first game without useEffect setState
  const didInitRef = useRef(false);
  if (!didInitRef.current && !selectedGame && games.length > 0) {
    didInitRef.current = true;
    setSelectedGameId(games[0]._id);
  }

  const { currentFen, isTerminal } = computePosition(
    selectedGame,
    plyIndex,
    branchMoves,
  );

  const variationSans = computeVariationSans(
    selectedGame,
    plyIndex,
    branchMoves,
  );

  const squareStyles: Record<string, CSSProperties> = {};
  if (bestMove) {
    squareStyles[bestMove.from] = {
      backgroundColor: "rgba(250, 204, 21, 0.45)",
    };
    squareStyles[bestMove.to] = { backgroundColor: "rgba(34, 197, 94, 0.4)" };
  }
  if (branchMoves.length > 0) {
    const last = branchMoves[branchMoves.length - 1];
    squareStyles[last.from] = {
      ...squareStyles[last.from],
      boxShadow: "inset 0 0 0 2px hsl(var(--primary))",
    };
    squareStyles[last.to] = {
      ...squareStyles[last.to],
      boxShadow: "inset 0 0 0 2px hsl(var(--primary))",
    };
  }

  function onPieceDrop({
    sourceSquare,
    targetSquare,
  }: {
    piece: { pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean {
    if (!targetSquare || isTerminal || !currentFen) return false;
    const move = tryLegalMove(currentFen, sourceSquare, targetSquare);
    if (!move) return false;
    setBranchMoves((prev) => [...prev, move]);
    setTapFrom(null);
    return true;
  }

  function onSquareClick({
    square,
  }: {
    piece: { pieceType: string } | null;
    square: string;
  }): void {
    if (!currentFen || isTerminal) return;
    const vc = new Chess(currentFen);
    const turn = vc.turn();
    type Sq = Parameters<Chess["get"]>[0];
    const onSquare = vc.get(square as Sq);

    if (tapFrom === null) {
      if (onSquare && onSquare.color === turn) setTapFrom(square);
      return;
    }
    if (square === tapFrom) {
      setTapFrom(null);
      return;
    }
    const move = tryLegalMove(currentFen, tapFrom, square);
    if (move) {
      setBranchMoves((prev) => [...prev, move]);
      setTapFrom(null);
      return;
    }
    if (onSquare && onSquare.color === turn) {
      setTapFrom(square);
    } else {
      setTapFrom(null);
    }
  }

  return (
    <div className={style.cm_root}>
      <div className={style.cm_board_outer}>
        <div className={style.cm_board}>
          <Chessboard
            options={{
              id: "analyze-board",
              position: currentFen,
              boardOrientation: orientation,
              showNotation: false,
              onPieceDrop,
              onSquareClick,
              squareStyles: squareStyles,
              pieces,
              allowDrawingArrows: false,
              dragActivationDistance: 5,
              lightSquareStyle: { background: "#F0D9B5" },
              darkSquareStyle: { background: "#B58863" },
            }}
          />
        </div>
      </div>
    </div>
  );
}

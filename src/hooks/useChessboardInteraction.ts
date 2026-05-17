import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { ChessboardOptions } from "react-chessboard";
import type { SquareHandlerArgs } from "react-chessboard";
import {
  getLegalTargetSquares,
  isLegalMoveOnFen,
  isPlayersPieceOnFen,
  pieceTypeColor,
  type BoardPlayerColor,
} from "../lib/chess/boardInteraction";

type UseChessboardInteractionArgs = {
  fen: string;
  playerColor?: BoardPlayerColor;
  canInteract: boolean;
  onMove: (from: string, to: string) => void | Promise<boolean>;
  baseSquareStyles?: Record<string, CSSProperties>;
};

export function useChessboardInteraction({
  fen,
  playerColor,
  canInteract,
  onMove,
  baseSquareStyles = {},
}: UseChessboardInteractionArgs) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    setSelectedSquare(null);
  }, [fen]);

  const legalTargets = useMemo(() => {
    if (!selectedSquare) return [];
    return getLegalTargetSquares(fen, selectedSquare);
  }, [fen, selectedSquare]);

  const selectionSquareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (!selectedSquare) return styles;

    styles[selectedSquare] = {
      backgroundColor: "rgba(229, 204, 122, 0.45)",
      boxShadow: "inset 0 0 0 2px rgba(229, 204, 122, 0.9)",
    };

    for (const square of legalTargets) {
      styles[square] = {
        background:
          "radial-gradient(circle, rgba(127, 196, 116, 0.55) 22%, transparent 23%)",
      };
    }

    return styles;
  }, [selectedSquare, legalTargets]);

  const squareStyles = useMemo(
    () => ({ ...baseSquareStyles, ...selectionSquareStyles }),
    [baseSquareStyles, selectionSquareStyles],
  );

  const attemptMove = useCallback(
    (from: string, to: string) => {
      if (!isLegalMoveOnFen(fen, from, to)) return;
      void Promise.resolve(onMove(from, to)).then((ok) => {
        if (ok !== false) setSelectedSquare(null);
      });
    },
    [fen, onMove],
  );

  const handleSquareClick = useCallback(
    ({ piece, square }: SquareHandlerArgs) => {
      if (!canInteract || !playerColor) return;

      if (selectedSquare) {
        if (square === selectedSquare) {
          setSelectedSquare(null);
          return;
        }

        if (isLegalMoveOnFen(fen, selectedSquare, square)) {
          attemptMove(selectedSquare, square);
          return;
        }

        const clickedColor = piece ? pieceTypeColor(piece.pieceType) : null;
        if (
          clickedColor === playerColor &&
          isPlayersPieceOnFen(fen, square, playerColor)
        ) {
          const targets = getLegalTargetSquares(fen, square);
          setSelectedSquare(targets.length > 0 ? square : null);
        } else {
          setSelectedSquare(null);
        }
        return;
      }

      if (
        piece &&
        pieceTypeColor(piece.pieceType) === playerColor &&
        isPlayersPieceOnFen(fen, square, playerColor)
      ) {
        const targets = getLegalTargetSquares(fen, square);
        if (targets.length > 0) setSelectedSquare(square);
      }
    },
    [attemptMove, canInteract, fen, playerColor, selectedSquare],
  );

  const onPieceDrop = useCallback<ChessboardOptions["onPieceDrop"]>(
    ({ sourceSquare, targetSquare }) => {
      if (!canInteract || !targetSquare) return false;
      if (!isLegalMoveOnFen(fen, sourceSquare, targetSquare)) return false;
      setSelectedSquare(null);
      void onMove(sourceSquare, targetSquare);
      return true;
    },
    [canInteract, fen, onMove],
  );

  const canDragPiece = useCallback<ChessboardOptions["canDragPiece"]>(
    ({ piece, square }) => {
      if (!canInteract || !square || !piece || !playerColor) return false;
      const color = pieceTypeColor(piece.pieceType);
      return (
        color === playerColor && isPlayersPieceOnFen(fen, square, playerColor)
      );
    },
    [canInteract, fen, playerColor],
  );

  return {
    squareStyles,
    onSquareClick: handleSquareClick,
    onPieceDrop,
    canDragPiece,
    allowDragging: canInteract,
    clearSelection: () => setSelectedSquare(null),
  };
}

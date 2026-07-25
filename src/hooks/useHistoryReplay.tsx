import { useQuery } from "@tanstack/react-query";
import { Chess } from "chess.js";
import { useMemo } from "react";
import { getMyGameHistoryItem } from "../api/history";

export function useHistoryReplay(
  selectedGameId: string | null,
  historyList: { _id: string; allMoves?: unknown[] }[],
  plyIndex: number,
) {
  const effectiveId = selectedGameId ?? historyList[0]?._id;

  const { data: activeGame } = useQuery({
    queryKey: ["game-detail", effectiveId],
    queryFn: () => getMyGameHistoryItem(effectiveId!),
    enabled: !!effectiveId,
  });

  const selectedGame: typeof activeGame | null = useMemo(() => {
    if (activeGame) return activeGame;
    return (
      (historyList.find((g) => g._id === effectiveId) as typeof activeGame) ??
      null
    );
  }, [activeGame, historyList, effectiveId]);

  const { currentFen, isTerminal } = useMemo(() => {
    const chess = new Chess();

    if (!selectedGame?.allMoves?.length) {
      return { currentFen: chess.fen(), isTerminal: false };
    }

    try {
      for (let i = 0; i < plyIndex; i++) {
        const move = selectedGame.allMoves[i];
        if (!move) break;
        if (!chess.move(move)) {
          console.warn(`Invalid move at index ${i}`, move);
          break;
        }
      }
    } catch (e) {
      console.error("Chess replay error:", e);
    }

    return { currentFen: chess.fen(), isTerminal: chess.isGameOver() };
  }, [selectedGame, plyIndex]);

  return { selectedGame, currentFen, isTerminal };
}

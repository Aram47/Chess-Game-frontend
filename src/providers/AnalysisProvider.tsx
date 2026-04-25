import { useState, useMemo } from "react";
import { ChessAnalysisContext } from "../context/ChessAnalysisContext";
import type { GameHistoryItem } from "../types/gameType";

export const ChessAnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<GameHistoryItem[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [plyIndex, setPlyIndex] = useState(0);

  const selectedGame = useMemo(
    () => games.find((g) => g._id === selectedGameId) || null,
    [games, selectedGameId],
  );

  const handleSetSelectedGameId = (id: string | null) => {
    setSelectedGameId(id);
    const game = games.find((g) => g._id === id);
    if (game) {
      setPlyIndex(game.allMoves.length);
    }
  };

  return (
    <ChessAnalysisContext.Provider
      value={{
        games,
        setGames,
        selectedGameId,
        setSelectedGameId: handleSetSelectedGameId,
        plyIndex,
        setPlyIndex,
        selectedGame,
      }}
    >
      {children}
    </ChessAnalysisContext.Provider>
  );
};

import { useCallback } from "react";
import { Chess } from "chess.js";
import type { PlayerColor, GameStatus } from "../../types/gameType";

export const useDetermineWinner = (
  playerColor: PlayerColor,
  isLiveGame: boolean,
) => {
  return useCallback(
    (winnerColor: "white" | "black" | "draw" | undefined) => {
      if (winnerColor === "draw") return "draw";
      if (!winnerColor) return null;

      const playerColorFull = playerColor === "w" ? "white" : "black";
      if (winnerColor === playerColorFull) return "you";
      return isLiveGame ? "opponent" : "bot";
    },
    [playerColor, isLiveGame],
  );
};

export const useSyncGameState = (
  chessRef: React.MutableRefObject<Chess>,
  setFen: (fen: string) => void,
  setGameStatus: (status: GameStatus) => void,
) => {
  return useCallback(
    (newFen?: string) => {
      const chess = chessRef.current;
      if (newFen) chess.load(newFen);

      setFen(chess.fen());

      if (chess.isCheckmate()) setGameStatus("checkmate");
      else if (chess.isStalemate()) setGameStatus("stalemate");
      else if (chess.isDraw()) setGameStatus("draw");
      else setGameStatus("playing");
    },
    [chessRef, setFen, setGameStatus],
  );
};

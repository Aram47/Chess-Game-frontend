import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReadyToPlay from "../../components/readyToPlay/ReadyToPlay";
import { useGame } from "../../context/GameContext";
import type { BotLevel } from "../../types/gameType";

export const PlayPage = () => {
  const navigate = useNavigate();
  const { findMatch, startBotGame } = useGame();

  const handleFindMatch = useCallback(() => {
    findMatch(); // This calls your context's socket logic
    navigate("/play/game"); // This moves the user to the board to wait
  }, [findMatch, navigate]);

  const handleBotGame = useCallback(
    (level: BotLevel = "medium") => {
      const color = Math.random() > 0.5 ? "w" : "b";
      void startBotGame(level, color);
      navigate("/play/game");
    },
    [startBotGame, navigate],
  );

  return (
    <ReadyToPlay
      handleFindMatch={handleFindMatch} // Pass the navigation wrapper
      handleBotGame={handleBotGame}
    />
  );
};

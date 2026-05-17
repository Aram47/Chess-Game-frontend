import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReadyToPlay from "../../components/readyToPlay/ReadyToPlay";
import SignInModal from "../../components/modal/SignInModal";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";
import type { BotLevel } from "../../types/gameType";
import type { PlayMode } from "../../components/readyToPlay/PlayModeChips";

export type PlayPageLocationState = {
  tab?: PlayMode;
};

export const PlayPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { findMatch, startBotGame } = useGame();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isStartingBot, setIsStartingBot] = useState(false);
  const [isStartingLive, setIsStartingLive] = useState(false);

  const initialTab =
    (location.state as PlayPageLocationState | null)?.tab ?? "platform";

  const handleFindMatch = useCallback(() => {
    setIsStartingLive(true);
    findMatch();
    navigate("/play/game", { state: { mode: "live" as const } });
    setIsStartingLive(false);
  }, [findMatch, navigate]);

  const handleBotGame = useCallback(
    async (level: BotLevel = "medium") => {
      setIsStartingBot(true);
      const color = Math.random() > 0.5 ? "w" : "b";
      try {
        await startBotGame(level, color);
        navigate("/play/game", { state: { mode: "bot" as const, level } });
      } finally {
        setIsStartingBot(false);
      }
    },
    [startBotGame, navigate],
  );

  return (
    <>
      <ReadyToPlay
        handleFindMatch={handleFindMatch}
        handleBotGame={handleBotGame}
        isStartingBot={isStartingBot}
        isStartingLive={isStartingLive}
        initialTab={initialTab}
        isAuthenticated={!!user}
        onRequireAuth={() => setShowAuthModal(true)}
      />
      {showAuthModal && (
        <SignInModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={() => setShowAuthModal(false)}
          onSwitchToRegister={() => {}}
          onSwitchToReset={() => {}}
        />
      )}
    </>
  );
};

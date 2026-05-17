import { useState } from "react";
import type { BotLevel } from "../../types/gameType";
import { PlayModeChips, type PlayMode } from "./PlayModeChips";
import { BotDifficultyPanel } from "./BotDifficultyPanel";
import { LiveMatchPanel } from "./LiveMatchPanel";

interface ReadyToPlayProps {
  handleBotGame: (level: BotLevel) => void;
  handleFindMatch: () => void;
  isStartingBot?: boolean;
  isStartingLive?: boolean;
  initialTab?: PlayMode;
  onRequireAuth: () => void;
  isAuthenticated: boolean;
}

const ReadyToPlay: React.FC<ReadyToPlayProps> = ({
  handleBotGame,
  handleFindMatch,
  isStartingBot = false,
  isStartingLive = false,
  initialTab = "platform",
  onRequireAuth,
  isAuthenticated,
}) => {
  const [activeTab, setActiveTab] = useState<PlayMode>(initialTab);

  const guardAuth = (action: () => void) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    action();
  };

  return (
    <section className="max-w-[1376px] w-full flex flex-col gap-8 mt-25 mx-auto font-barlow px-8 pb-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[42px] font-semibold leading-tight text-[var(--color-gold)]">
          Ready To Play ?
        </h1>
        <p className="text-xl font-medium text-[var(--muted)] max-w-xl">
          Choose your opponent, set the challenge, and start playing.
        </p>
      </div>

      <div className="flex justify-end w-full">
        <PlayModeChips
          activeTab={activeTab}
          onPlatformClick={() => setActiveTab("platform")}
          onLiveClick={() => setActiveTab("live")}
        />
      </div>

      {activeTab === "platform" ? (
        <BotDifficultyPanel
          onStart={(level) => guardAuth(() => handleBotGame(level))}
          isStarting={isStartingBot}
        />
      ) : (
        <LiveMatchPanel
          onStart={() => guardAuth(handleFindMatch)}
          isStarting={isStartingLive}
        />
      )}
    </section>
  );
};

export default ReadyToPlay;

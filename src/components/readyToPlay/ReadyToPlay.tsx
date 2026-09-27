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
    <section className="max-w-[1376px] w-full flex flex-col gap-8 mt-8 mx-auto px-4 md:px-8 pb-8">
      <div className="flex flex-wrap justify-end w-full">
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

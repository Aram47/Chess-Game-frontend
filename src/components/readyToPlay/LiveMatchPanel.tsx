import { StartGameButton } from "./StartGameButton";

interface LiveMatchPanelProps {
  onStart: () => void;
  isStarting?: boolean;
}

export function LiveMatchPanel({ onStart, isStarting }: LiveMatchPanelProps) {
  return (
    <div
      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(206,184,110,0.2)] rounded-[20px] p-8 flex flex-col items-center justify-center gap-8 min-h-[532px]"
      role="tabpanel"
      aria-label="Live matchmaking"
    >
      <div className="flex flex-col items-center gap-3 text-center max-w-md">
        <h2 className="text-2xl font-medium text-[#CFCFCF]">
          Find a live opponent
        </h2>
        <p className="text-sm text-[#A39589]">
          Start matchmaking and we will pair you with another player when someone
          is available.
        </p>
      </div>

      <StartGameButton onClick={onStart} loading={isStarting} label="Start Game" />
    </div>
  );
}

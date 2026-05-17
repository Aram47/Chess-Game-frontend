import monitor from "../../assets/icons/play/platform.svg";
import user from "../../assets/icons/play/player.svg";

export type PlayMode = "platform" | "live";

interface PlayModeChipsProps {
  activeTab: PlayMode;
  onPlatformClick: () => void;
  onLiveClick: () => void;
}

const chipBase =
  "flex items-center gap-2 px-3 py-1.5 rounded-full text-base font-semibold transition-all cursor-pointer";

export function PlayModeChips({
  activeTab,
  onPlatformClick,
  onLiveClick,
}: PlayModeChipsProps) {
  return (
    <div
      className="inline-flex bg-[rgba(255,255,255,0.05)] border border-[rgba(206,184,110,0.2)] rounded-full gap-2 p-1.5"
      role="tablist"
      aria-label="Game mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "platform"}
        onClick={onPlatformClick}
        className={`${chipBase} ${
          activeTab === "platform"
            ? "bg-[#E5CC7A] text-[#1C1C1C]"
            : "text-[#F7EFD6] bg-transparent"
        }`}
      >
        <span className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
          <img src={monitor} alt="" className="w-4 h-3.5" aria-hidden />
        </span>
        vs Platform
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "live"}
        onClick={onLiveClick}
        className={`${chipBase} ${
          activeTab === "live"
            ? "bg-[#E5CC7A] text-[#1C1C1C]"
            : "text-[#F7EFD6] bg-transparent"
        }`}
      >
        <span className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
          <img
            src={user}
            alt=""
            className="w-4 h-3.5"
            aria-hidden
            style={{
              filter: activeTab === "live" ? "brightness(0)" : "none",
            }}
          />
        </span>
        vs Live Player
      </button>
    </div>
  );
}

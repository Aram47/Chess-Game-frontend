import monitor from "../../assets/icons/play/platform.svg";
import user from "../../assets/icons/play/player.svg";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../hooks/useTranslation";

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
  const { t } = useTranslation();
  const { theme } = useTheme();

  const getChipClassName = (tabName: PlayMode) => {
    const isActive = activeTab === tabName;

    if (isActive) {
      return theme === "dark"
        ? `${chipBase} bg-[#E5CC7A] text-[#1C1C1C]`
        : `${chipBase} text-white bg-[linear-gradient(180deg,#DA7756_0%,#D77554_8.33%,#D47251_16.67%,#D1704F_25%,#CF6E4D_33.33%,#CC6C4A_41.67%,#C96948_50%,#C66746_58.33%,#C36543_66.67%,#C06341_75%,#BE603F_83.33%,#BB5E3C_91.67%,#B85C3A_100%)]`;
    }

    return theme === "dark"
      ? `${chipBase} bg-transparent text-[#F7EFD6]`
      : `${chipBase} bg-transparent text-[#da7756]`;
  };

  return (
    <div
      className="inline-flex bg-[rgba(255,255,255,0.05)] border border-[rgba(206,184,110,0.2)] rounded-full gap-2 p-1.5"
      role="tablist"
      aria-label="Game mode"
    >
      {/* Platform Button */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "platform"}
        onClick={onPlatformClick}
        className={getChipClassName("platform")}
      >
        <span className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
          <img
            src={monitor}
            alt=""
            className="w-4 h-3.5"
            aria-hidden
            style={{
              filter: activeTab === "platform" ? "brightness(0)" : "brightness(0.5)",
            }}
          />
        </span>
        {t("vs_platform")}
      </button>

      {/* Live Button */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "live"}
        onClick={onLiveClick}
        className={getChipClassName("live")}
      >
        <span className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
          <img
            src={user}
            alt=""
            className="w-4 h-3.5"
            aria-hidden
            style={{
              filter: activeTab === "live" ? "brightness(0)" : "brightness(0.5)",
            }}
          />
        </span>
        {t("vs_live_player")}
      </button>
    </div>
  );
}
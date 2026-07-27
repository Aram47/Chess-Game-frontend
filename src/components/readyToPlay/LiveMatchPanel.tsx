import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../hooks/useTranslation";
import { StartGameButton } from "./StartGameButton";

interface LiveMatchPanelProps {
  onStart: () => void;
  isStarting?: boolean;
}

export function LiveMatchPanel({ onStart, isStarting }: LiveMatchPanelProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div
      className={`w-full border border-[rgba(206,184,110,0.2)] rounded-[20px] p-8 flex flex-col items-center justify-center gap-8 min-h-[532px] ${theme === "dark" ? "bg-[rgba(255,255,255,0.05)]" : "bg-[#FFFFFF]"}`}
      role="tabpanel"
      aria-label="Live matchmaking"
    >
      <div className="flex flex-col items-center gap-3 text-center max-w-md">
        <h2 className="text-2xl font-medium text-[#CFCFCF]">
          {t("find_live_opponent")}
        </h2>
        <p className="text-sm text-[#A39589]">{t("live_matchmaking_desc")}</p>
      </div>

      <StartGameButton onClick={onStart} loading={isStarting} />
    </div>
  );
}

import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../hooks/useTranslation";

interface StartGameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

export function StartGameButton({
  onClick,
  disabled = false,
  loading = false,
  label,
}: StartGameButtonProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const buttonLabel = label ?? t("start_game");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`max-w-[382px] w-full h-16 rounded-[90px] transition font-semibold text-center disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark" ? "text-[#1C1C1C]" : "text-[#FFFFFF]"}`}
      style={{
        background: "var(--bg-line)",
        boxShadow: "0px 4px 10px rgba(229, 204, 122, 0.3)",
      }}
    >
      {loading ? t("starting") : buttonLabel}
    </button>
  );
}

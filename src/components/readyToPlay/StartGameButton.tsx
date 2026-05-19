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
  const buttonLabel = label ?? t("start_game");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="max-w-[382px] w-full h-16 rounded-[90px] transition text-[#1C1C1C] font-semibold text-center disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(180deg, #E5CC7A 0%, #F4E09E 100%)",
        boxShadow: "0px 4px 10px rgba(229, 204, 122, 0.3)",
      }}
    >
      {loading ? t("starting") : buttonLabel}
    </button>
  );
}

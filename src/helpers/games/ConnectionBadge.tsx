import { useTranslation } from "react-i18next";

interface ConnectionBadgeProps {
  status: string;
  gameStatus: string;
}

export const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({
  status,
  gameStatus,
}) => {
  const { t } = useTranslation();
  if (gameStatus === "waiting") {
    return (
      <span className="text-sm text-[#E5CC7A] animate-pulse">
        ● {t("finding_opponent")}
      </span>
    );
  }
  const connected = status === "connected";
  return (
    <span
      className={`text-sm ${connected ? "text-green-500" : "text-amber-500"}`}
    >
      ● {connected ? t("connected") : t("reconnecting")}
    </span>
  );
};

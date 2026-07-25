import { useTranslation } from "../../hooks/useTranslation";

interface LockedBoardProps {
  onLogin: () => void;
}

export const LockedBoard: React.FC<LockedBoardProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-[600px] bg-[#1c1c1c] flex flex-col justify-center items-center rounded-3xl border-2 border-dashed border-[#CEB86E33]">
      <div className="max-w-[300px] text-center space-y-6">
        <p className="text-[#A39589] text-lg">{t("game_locked_message")}</p>
        <button
          onClick={onLogin}
          className="w-full bg-[#E5CC7A] text-black py-3 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          {t("login_register")}
        </button>
      </div>
    </div>
  );
};

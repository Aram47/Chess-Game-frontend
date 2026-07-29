import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import SignInModal from "../modal/SignInModal";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";
import { TrophyIcon } from "../../assets/icons/about/trophyIcon";

const Ready = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    if (!user && location.pathname === "/about") {
      setShowSignIn(true);
    } else if (!user) {
      setShowSignIn(true);
    } else {
      navigate("/play");
    }
  };
  return (
    <>
      <footer
        className={`backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center ${theme === "dark" ? "bg-white/[0.03]" : "bg-[#FFFFFFCC]"}`}
      >
        <div
          className={`w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-8 p-3 ${theme === "dark" ? "bg-white/10" : "bg-[#DA775614]"}`}
        >
          <TrophyIcon />
        </div>
        <h2 className="text-2xl font-medium text-[#E5CC7A] mb-1">
          {t("ready_title")}
        </h2>
        <p className="text-[#A39589] max-w-xl mx-auto mb-8">
          {t("ready_description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="px-11 py-3 bg-[var(--text-h)] text-[var(--bg)] text-sm font-semibold hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] font-bold rounded-full transition-all cursor-pointer hover:-translate-y-[2px] duration-800"
            onClick={handleClick}
          >
            {t("ready_start_playing")}
          </button>
          <button className="px-11 py-3 border border-[var(--text-h)] hover:bg-white/5 text-[var(--span)] font-bold rounded-full transition-all font-semibold hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] cursor-pointer hover:-translate-y-[2px] duration-800 hover:bg-[#E5CC7A4D]">
            {t("ready_watch_demo")}
          </button>
        </div>
      </footer>

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={() => {
            setShowSignIn(false);
            navigate("/play");
          }}
        />
      )}
    </>
  );
};

export default Ready;

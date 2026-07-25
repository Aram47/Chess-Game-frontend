import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";
import type { UiLang } from "../../constants/strings";
import usaIcon from "../../assets/icons/flags/usaFlag.svg";
import rusIcon from "../../assets/icons/flags/rusFlag.svg";
import NotificationBell from "../notification/NotificationBell";
import armIcon from "../../assets/icons/flags/armFlag.svg";
import userIcon from "../../assets/icons/header/user.svg";
import settingsIcon from "../../assets/icons/header/settings.svg";
import logoutIcon from "../../assets/icons/header/logout.svg";
import light from "../../assets/icons/header/light.svg";
import dark from "../../assets/icons/header/dark.svg";

import style from "./header.module.scss";

interface HeaderType {
  setActiveModal: (type: "signup" | "signin" | null) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const Header = ({
  setActiveModal,
  isSettingsOpen,
  setIsSettingsOpen,
}: HeaderType) => {
  const [showFlag, setShowFlag] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t, lang, setLang } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const flags: { id: UiLang; icon: string; alt: string }[] = [
    { id: "en", icon: usaIcon, alt: "usa flag" },
    { id: "ru", icon: rusIcon, alt: "rus flag" },
    { id: "am", icon: armIcon, alt: "arm flag" },
  ];

  const activeFlag = flags.find((f) => f.id === lang) ?? flags[0];

  const handleFlagClick = (flag: (typeof flags)[0]) => {
    setLang(flag.id);
    setShowFlag(false);
  };

  return (
    <>
      <header
        data-lang={lang}
        data-modal-open={isSettingsOpen ? "true" : "false"}
        className={`border-1
            ${theme === "dark" ? "border-[#CEB86E33]" : "border-[#F0C4B4]"}
            ${style.cm_container} transition-shadow duration-300
            ${isSettingsOpen ? "shadow-none" : "shadow-[your-existing-shadow-class]"} 
            ${!isHomePage ? "static transform-none" : style.headerAnimate}`}
      >
        <div className={style.cm_header}>
          <div className={style.cm_left}>
            <span className={style.cm_logo} onClick={() => navigate("/")}>
              {t("app_name")}
            </span>
          </div>
          <nav className={style.cm_nav}>
            <ul className={style.cm_links}>
              <li>
                <NavLink to="/play">{t("nav_play")}</NavLink>
              </li>
              <li>
                <NavLink to="/problems">{t("nav_problems")}</NavLink>
              </li>
              <li>
                <NavLink to="/analyze">{t("nav_analyze")}</NavLink>
              </li>

              <li>
                <NavLink to="/about">{t("nav_about")}</NavLink>
              </li>
            </ul>
          </nav>

          <div className={style.cm_right}>
            <div
              onClick={toggleTheme}
              className={`w-16 h-7 rounded-[20px] border p-1 cursor-pointer flex items-center transition-colors duration-300 ease-in-out ${
                theme === "dark"
                  ? "bg-[#1C1C1C80] border-[#303030] shadow-[0px_4px_4px_0px_#00000040_inset]"
                  : "bg-gradient-to-b from-[#DA7756] via-[#C96948] to-[#B85C3A] border-[#EB7C57]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out ${
                  theme === "dark" ? "translate-x-0" : "translate-x-9"
                }`}
              >
                <img src={theme === "dark" ? dark : light} alt="theme-mode" />
              </div>
            </div>
            <div className={style.cm_right_flags}>
              <img
                src={activeFlag.icon}
                alt={activeFlag.alt}
                onClick={() => setShowFlag(!showFlag)}
              />

              {showFlag && (
                <div className={style.cm_right_flags_show}>
                  {flags
                    .filter((f) => f.id !== activeFlag.id)
                    .map((flag) => (
                      <img
                        key={flag.id}
                        src={flag.icon}
                        alt={flag.alt}
                        onClick={() => handleFlagClick(flag)}
                      />
                    ))}
                </div>
              )}
            </div>

            {user ? (
              <div className={style.cm_user_profile}>
                <NotificationBell isLoggedIn={!!user} />
                <span>{t("header_nickname")}</span>
                <button
                  className={style.cm_btn}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.username?.charAt(0) || t("header_user")}{" "}
                </button>

                {isDropdownOpen && (
                  <div className={style.dropdown_menu}>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <img src={userIcon} alt="userIcon" />
                      <span>{t("header_profile")}</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <img src={settingsIcon} alt="settings" />
                      <span>{t("header_settings")}</span>
                    </button>
                    <div className="h-[1px] w-full bg-[#E5CC7A1A] my-2"></div>
                    <button onClick={logout} className={style.logout}>
                      <img
                        src={logoutIcon}
                        alt="logout"
                        className={style.logoutIcon}
                      />
                      <span>{t("header_logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className={style.cm_signup}
                  onClick={() => setActiveModal("signup")}
                >
                  {t("header_signup")}
                </button>
                <button
                  className={style.cm_signin}
                  onClick={() => setActiveModal("signin")}
                >
                  {t("header_signin")}
                </button>
              </div>
            )}
          </div>
          {/* {isSettingsOpen && (
          <SettingsModal onClose={() => setIsSettingsOpen(false)} />
        )} */}
        </div>
      </header>
    </>
  );
};

export default Header;

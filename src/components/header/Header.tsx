import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";
import type { StringKey, UiLang } from "../../constants/strings";
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

const NAV_LINKS: { to: string; key: StringKey }[] = [
  { to: "/play", key: "nav_play" },
  { to: "/problems", key: "nav_problems" },
  { to: "/analyze", key: "nav_analyze" },
  { to: "/about", key: "nav_about" },
];

const Header = ({
  setActiveModal,
  isSettingsOpen,
  setIsSettingsOpen,
}: HeaderType) => {
  const [showFlag, setShowFlag] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

  const closeMenu = () => setMenuOpen(false);

  const handleFlagClick = (flag: (typeof flags)[0]) => {
    setLang(flag.id);
    setShowFlag(false);
  };

  useEffect(() => {
    closeMenu();
    setIsDropdownOpen(false);
    setShowFlag(false);
  }, [location.pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width >= 1120) setMenuOpen(false);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const ThemeSwitch = () => (
    <button
      type="button"
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className={`w-16 h-7 rounded-[20px] border p-1 cursor-pointer flex items-center transition-colors duration-300 ease-in-out ${
        theme === "dark"
          ? "bg-[#1C1C1C80] border-[#303030] shadow-[0px_4px_4px_0px_#00000040_inset]"
          : "bg-gradient-to-b from-[#DA7756] via-[#C96948] to-[#B85C3A] border-[#EB7C57]"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-0" : "translate-x-9"
        }`}
      >
        <img src={theme === "dark" ? dark : light} alt="theme-mode" />
      </span>
    </button>
  );

  const navLinks = (onNavigate?: () => void) =>
    NAV_LINKS.map((link) => (
      <li key={link.to}>
        <NavLink to={link.to} onClick={onNavigate}>
          {t(link.key)}
        </NavLink>
      </li>
    ));

  const openAuth = (type: "signup" | "signin") => {
    setActiveModal(type);
    closeMenu();
  };

  return (
    <header
      ref={headerRef}
      data-lang={lang}
      data-modal-open={isSettingsOpen ? "true" : "false"}
      className={`border-1
          ${theme === "dark" ? "border-[#CEB86E33]" : "border-[#F0C4B4]"}
          ${style.cm_container} transition-shadow duration-300
          ${isSettingsOpen ? "shadow-none" : ""}
          ${!isHomePage ? "static transform-none" : style.headerAnimate}`}
    >
      <div className={style.cm_header}>
        <div className={style.cm_left}>
          <span className={style.cm_logo} onClick={() => navigate("/")}>
            {t("app_name")}
          </span>
        </div>
        <nav className={style.cm_nav}>
          <ul className={style.cm_links}>{navLinks()}</ul>
        </nav>

        <div className={style.cm_right}>
          <div className={style.cm_tools}>
            {ThemeSwitch()}
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
                <span className={style.cm_user_name}>
                  {user.username || t("header_user")}
                </span>
                <button
                  type="button"
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
                      className={`${theme === "dark" ? "hover:bg-[#252525]" : "hover:bg-[#F5F5F5]"}`}
                    >
                      <img src={userIcon} alt="" />
                      <span>{t("header_profile")}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className={`${theme === "dark" ? "hover:bg-[#252525]" : "hover:bg-[#F5F5F5]"}`}
                    >
                      <img src={settingsIcon} alt="" />
                      <span>{t("header_settings")}</span>
                    </button>
                    <div className="h-[1px] w-full bg-[#E5CC7A1A] my-2"></div>
                    <button
                      type="button"
                      onClick={logout}
                      className={`${style.logout} ${theme === "dark" ? "hover:bg-[#252525]" : "hover:bg-[#F5F5F5]"}`}
                    >
                      <img
                        src={logoutIcon}
                        alt=""
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
                  type="button"
                  className={`${style.cm_signup} text-[var(--text-h)]`}
                  onClick={() => openAuth("signup")}
                >
                  {t("header_signup")}
                </button>
                <button
                  type="button"
                  className={style.cm_signin}
                  onClick={() => openAuth("signin")}
                >
                  {t("header_signin")}
                </button>
              </div>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={style.menuButton}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={t("header_menu")}
            onClick={() => {
              setIsDropdownOpen(false);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="site-menu" className={style.menuPanel}>
          <nav>
            <ul className={style.menuLinks}>{navLinks(closeMenu)}</ul>
          </nav>
          {!user && (
            <button
              type="button"
              className={`${style.menuAction} ${style.menuSignup}`}
              onClick={() => openAuth("signup")}
            >
              {t("header_signup")}
            </button>
          )}
          <div className={style.menuTools}>
            <div className={style.menuThemeRow}>
              {ThemeSwitch()}
            </div>
            <div className={style.menuFlags}>
              {flags.map((flag) => (
                <button
                  key={flag.id}
                  type="button"
                  aria-pressed={flag.id === lang}
                  onClick={() => handleFlagClick(flag)}
                >
                  <img src={flag.icon} alt={flag.alt} />
                </button>
              ))}
            </div>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={style.menuAction}
                  onClick={closeMenu}
                >
                  <img src={userIcon} alt="" />
                  <span>{t("header_profile")}</span>
                </Link>
                <button
                  type="button"
                  className={style.menuAction}
                  onClick={() => {
                    setIsSettingsOpen(true);
                    closeMenu();
                  }}
                >
                  <img src={settingsIcon} alt="" />
                  <span>{t("header_settings")}</span>
                </button>
                <button
                  type="button"
                  className={`${style.menuAction} ${style.logout}`}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <img src={logoutIcon} alt="" className={style.logoutIcon} />
                  <span>{t("header_logout")}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={style.menuAction}
                  onClick={() => openAuth("signup")}
                >
                  {t("header_signup")}
                </button>
                <button
                  type="button"
                  className={style.menuAction}
                  onClick={() => openAuth("signin")}
                >
                  {t("header_signin")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

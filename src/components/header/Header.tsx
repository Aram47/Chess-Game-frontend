import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
// import SettingsModal from "../settings/SettingsHistory";
import usaIcon from "../../assets/icons/flags/usaFlag.svg";
import rusIcon from "../../assets/icons/flags/rusFlag.svg";
import armIcon from "../../assets/icons/flags/armFlag.svg";
import userIcon from "../../assets/icons/header/user.svg";
import settingsIcon from "../../assets/icons/header/settings.svg";
import logoutIcon from "../../assets/icons/header/logout.svg";

import style from "./header.module.scss";
import NotificationBell from "../notification/notificationBell";

interface HeaderType {
  setActiveModal: (type: "signup" | "signin" | null) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const Header = ({ setActiveModal, setIsSettingsOpen }: HeaderType) => {
  const navigate = useNavigate();
  const [showFlag, setShowFlag] = useState(false);
  const { user, logout } = useAuth();

  const flags = [
    { id: "en", icon: usaIcon, alt: "usa flag" },
    { id: "ru", icon: rusIcon, alt: "rus flag" },
    { id: "am", icon: armIcon, alt: "arm flag" },
  ];

  const [activeFlag, setActiveFlag] = useState(flags[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFlagClick = (flag: (typeof flags)[0]) => {
    setActiveFlag(flag);
    setShowFlag(!showFlag);
  };

  return (
    <>
      <header className={`${style.cm_container} ${style.headerAnimate}`}>
        <div className={style.cm_header}>
          <div className={style.cm_left}>
            <span className={style.cm_logo} onClick={() => navigate("/")}>
              ChessMaster
            </span>
          </div>
          <nav className={style.cm_nav}>
            <ul className={style.cm_links}>
              <li>
                <NavLink to="/play">Play</NavLink>
              </li>
              <li>
                <NavLink to="#">Problems</NavLink>
              </li>
              <li>
                <NavLink to="/analyze">Analyze</NavLink>
              </li>
              <li>
                <NavLink to="#">Classes</NavLink>
              </li>
              <li>
                <NavLink to="#">About</NavLink>
              </li>
            </ul>
          </nav>

          <div className={style.cm_right}>
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
                <NotificationBell
                  isLoggedIn={!!user}
                  onNotification={(event) => {
                    console.log("Notification event:", event.eventType, event.parsedData);
                  }}
                />
                <span>Nickname</span>
                <button
                  className={style.cm_btn}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.username.charAt(0) || "User"}
                </button>

                {isDropdownOpen && (
                  <div className={style.dropdown_menu}>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <img src={userIcon} alt="userIcon" />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <img src={settingsIcon} alt="settings" />
                      <span>Settings</span>
                    </button>
                    <div className="h-[1px] w-full bg-[#E5CC7A1A] my-2"></div>
                    <button onClick={logout} className={style.logout}>
                      <img
                        src={logoutIcon}
                        alt="logout"
                        className={style.logoutIcon}
                      />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}

                {/* {isOpen && (
                <div>
                    <Link to="/profile">
                        <img src="" alt="" />
                        <span>Profile</span>
                    </Link>
                    <button onClick={() => {}}>
                        <img src="" alt="" />
                        <span>Settings</span>
                    </button>
                    <Link to="/profile">
                        <img src="" alt="" />
                        <span>Log Out</span>
                    </Link>
                    </div>
              )} */}
              </div>
            ) : (
              <div>
                <button
                  className={style.cm_signup}
                  onClick={() => setActiveModal("signup")}
                >
                  Sign up
                </button>
                <button
                  className={style.cm_signin}
                  onClick={() => setActiveModal("signin")}
                >
                  Sign In
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

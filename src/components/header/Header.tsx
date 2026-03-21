import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import usaIcon from "../../assets/icons/flags/usaFlag.svg";
import rusIcon from "../../assets/icons/flags/rusFlag.svg";
import armIcon from "../../assets/icons/flags/armFlag.svg";

import style from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [showFlag, setShowFlag] = useState(false);

  const flags = [
    { id: "en", icon: usaIcon, alt: "usa flag" },
    { id: "ru", icon: rusIcon, alt: "rus flag" },
    { id: "am", icon: armIcon, alt: "arm flag" },
  ];

  const [activeFlag, setActiveFlag] = useState(flags[0]);

  const handleFlagClick = (flag: (typeof flags)[0]) => {
    setActiveFlag(flag);
    setShowFlag(!showFlag);
  };

  return (
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
              <NavLink to="#">Play</NavLink>
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

          <button className={style.cm_signup}>Sign up</button>
          <button className={style.cm_signin}>Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

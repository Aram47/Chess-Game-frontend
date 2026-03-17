import { NavLink } from "react-router-dom";

import style from "./header.module.scss";

const Header = () => {
  return (
    <header className={style.cm_container}>
      <div className={style.cm_header}>
        <div className={style.cm_left}>
          <span className={style.cm_logo}>ChessMaster</span>
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
              <NavLink to="#">Analyze</NavLink>
            </li>
            <li>
              <NavLink to="#">Classes</NavLink>
            </li>
            <li>
              <NavLink to="#">About</NavLink>
            </li>
          </ul>
        </nav>
        <button className={style.cm_signin}>Sign In</button>
      </div>
    </header>
  );
};

export default Header;

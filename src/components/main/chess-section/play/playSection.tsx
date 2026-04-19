import { useNavigate } from "react-router";
import play from "../../../../assets/icons/play.svg";
import rightArrow from "../../../../assets/icons/rightArrow.svg";

import style from "./style.module.scss";

const PlaySection = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/play");
  };
  return (
    <div className={`${style.cm_column}`}>
      <h1 className={`cm_headline ${style.cm_title}`}>
        Play Chess <span>Your Way</span>
      </h1>

      <p className="cm_subline cm_desc">
        Challenge our advanced AI bots, compete with players worldwide, or join
        high-stakes tournaments. Experience the thrill of the game in a stunning
        3D environment.
      </p>
      <div className={`${style.cm_actions} cm_buttons`}>
        <button onClick={handleStartGame} className={`cm_btn_fill ${style.cm_start}`}>
          Start Game
          <img src={play} alt="play" />
        </button>
        <div className={`cm_button ${style.cm_primary}`}>
          <button className={`${style.cm_btn_ghost}`}>Primary button</button>
          <img src={rightArrow} alt="right-arrow" />
        </div>
      </div>
    </div>
  );
};

export default PlaySection;

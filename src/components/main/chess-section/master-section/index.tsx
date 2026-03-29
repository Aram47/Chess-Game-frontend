import type { FC } from "react";
import style from "./style.module.scss";

interface MasterChessSectionProps {
  phase: "idle" | "entrance" | "exit";
}

const MasterChessSection: FC<MasterChessSectionProps> = ({ phase }) => {
  return (
    <div
      className={`${style.cm_copy} ${phase === "exit" ? style.hide_text : ""}`}
    >
      <h1 className={`cm_headline ${style.cm_title}`}>
        Master the <span>Art</span> of Chess
      </h1>

      <p className="cm_subline cm_text">
        Elevate your game with AI-powered analysis, expert instruction, and a
        global community of chess enthusiasts.
      </p>
      <div className={`${style.cm_actions} cm_buttons`}>
        <button className="cm_btn_fill">Start Playing</button>
        <button className={`${style.cm_btn_ghost} cm_button`}>Watch Demo</button>
      </div>
    </div>
  );
};

export default MasterChessSection;

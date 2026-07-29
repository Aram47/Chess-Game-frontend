import { useNavigate } from "react-router";
import { useTranslation } from "../../../../hooks/useTranslation";
// import play from "../../../../assets/icons/play.svg";
import rightArrow from "../../../../assets/icons/rightArrow.svg";

import style from "./style.module.scss";
import { useTheme } from "../../../../context/ThemeContext";
import { PlayIcon } from "../../../../assets/icons/play";

const PlaySection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleStartGame = () => {
    navigate("/play");
  };
  return (
    <div className={`${style.cm_column}`}>
      <h1 className={`cm_headline ${style.cm_title}`}>
        {t("play_chess_title")}
        <span
          className={`${theme === "dark" ? "text-[#F5F1E8]" : "text-[Primary/500]"}`}
        >
          {t("your_way")}
        </span>
      </h1>

      <p className="cm_subline cm_desc">{t("play_chess_subtitle")}</p>
      <div className={`${style.cm_actions} cm_buttons`}>
        <button
          onClick={handleStartGame}
          className={`cm_btn_fill ${style.cm_start}`}
        >
          <span
            className={`${theme === "dark" ? "text-[#1C1C1C]" : "text-white"}`}
          >
            {t("start_game")}
          </span>
          <PlayIcon theme={theme} />
        </button>
        <div className={`cm_button ${style.cm_primary}`}>
          <button className={`${style.cm_btn_ghost}`}>{t("watch_demo")}</button>
          <img src={rightArrow} alt="right-arrow" />
        </div>
      </div>
    </div>
  );
};

export default PlaySection;

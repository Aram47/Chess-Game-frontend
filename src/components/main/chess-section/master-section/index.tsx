import type { FC } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import style from "./style.module.scss";

interface MasterChessSectionProps {
  phase: "idle" | "entrance" | "exit";
}

const MasterChessSection: FC<MasterChessSectionProps> = ({ phase }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${style.cm_copy} ${phase === "exit" ? style.hide_text : ""}`}
    >
      <h1 className={`cm_headline ${style.cm_title}`}>
        {t("master_chess_title")}
      </h1>

      <p className="cm_subline cm_text">{t("master_chess_subtitle")}</p>
      <div className={`${style.cm_actions} cm_buttons`}>
        <button className="cm_btn_fill">{t("start_playing")}</button>
        <button className={`${style.cm_btn_ghost} cm_button`}>
          {t("watch_demo")}
        </button>
      </div>
    </div>
  );
};

export default MasterChessSection;

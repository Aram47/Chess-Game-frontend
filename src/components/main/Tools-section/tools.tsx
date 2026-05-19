import { toolsData } from "../../../data/tools-data";
import { useTranslation } from "../../../hooks/useTranslation";

import style from "./style.module.scss";

export const Tools = () => {
  const { t } = useTranslation();

  return (
    <div className={style.tools_row}>
      {toolsData.map((tool) => (
        <div key={tool.titleKey} className={style.tools_column}>
          <p>{tool.icon}</p>

          <div className={style.tools_column_title}>
            <h2>{t(tool.titleKey)}</h2>
            <p>{t(tool.descriptionKey)}</p>
          </div>

          <div className={style.tools_column_links}>
            {tool.linkKeys.map((linkKey) => (
              <div key={linkKey}>
                <span>&rarr;</span>
                <span>{t(linkKey)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

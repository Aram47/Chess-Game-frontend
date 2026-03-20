import { toolsData } from "../../../data/tools-data";

import style from "./style.module.scss";

export const Tools = () => {
  return (
    <div className={style.tools_row}>
      {toolsData.map((tool) => (
        <div key={tool.title} className={style.tools_column}>
          <p>{tool.icon}</p>

          <div className={style.tools_column_title}>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
          </div>

          <div className={style.tools_column_links}>
            {tool.links.map((link) => (
              <div key={link}>
                <span>&rarr;</span>
                <span>{link}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
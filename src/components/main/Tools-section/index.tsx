import { Tools } from "./tools";
import { useTranslation } from "../../../hooks/useTranslation";

import style from "./style.module.scss";

const ToolsSection = () => {
  const { t } = useTranslation();

  return (
    <section className={style.tools}>
      <header className={style.tools_title}>
        <h1>{t("tools_section_title")}</h1>
        <p>{t("tools_section_subtitle")}</p>
      </header>

      <section className={style.tools_section}>
        <Tools />
      </section>
    </section>
  );
};

export default ToolsSection;

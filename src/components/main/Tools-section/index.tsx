import { Tools } from "./tools";

import style from "./style.module.scss";

const ToolsSection = () => {
  return (
    <section className={style.tools}>
      <header className={style.tools_title}>
        <h1>Everything You Need to Excel</h1>
        <p>
          Comprehensive tools and features designed to take your chess skills to
          the next level
        </p>
      </header>

      <section className={style.tools_section}>
        <Tools />
      </section>
    </section>
  );
};

export default ToolsSection;

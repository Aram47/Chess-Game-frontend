import ChessMaster from "../../components/main/chess-section/chess";
// import FreeAccount from "../../components/main/free-account";
// import ToolsSection from "../../components/main/Tools-section";

import style from "./style.module.scss";

const HomePage = () => {
  return (
    <div className={style.cm_root}>
      <ChessMaster />
      {/* <ToolsSection />
      <FreeAccount /> */}
    </div>
  );
};

export default HomePage;

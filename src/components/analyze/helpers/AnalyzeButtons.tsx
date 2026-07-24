import { NavButton } from "../../../helpers/buttons";

import play from "../../../assets/icons/analyze/play.svg";
import skipBack from "../../../assets/icons/analyze/skipBack.svg";
import skipNext from "../../../assets/icons/analyze/skipNext.svg";
import rightArrow from "../../../assets/icons/analyze/rightArrow.svg";
import { useTheme } from "../../../context/ThemeContext";
import { LeftIcon } from "../../../assets/icons/analyze/leftIcon.tsx";

interface AnalyzeButtonsProps {
  plyIndex?: number;
  goBack: () => void;
  goForward: () => void;
  goFirst: () => void;
  goLast: () => void;
}

const AnalyzeButtons: React.FC<AnalyzeButtonsProps> = ({
  goBack,
  goForward,
  goFirst,
  goLast,
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <NavButton
        onClick={goFirst}
        icon={<img src={skipBack} alt="first" />}
        className={`p-3 rounded-full hover:bg-[#333] transition-all cursor-pointer ${theme ? "bg-[var(--bg)]" : "bg-[#262421]"}`}
      />

      <NavButton
        onClick={goBack}
        icon={<LeftIcon theme={theme} />}
        className={`p-3 rounded-full transition-all cursor-pointer ${
          theme
            ? "bg-[var(--bg)] hover:bg-[#333]"
            : "bg-[#f0e8d0] hover:bg-[#e4dac0]"
        }`}
      />

      <NavButton
        icon={<img src={play} alt="play" />}
        className={`p-3 rounded-full hover:bg-[#333] transition-all cursor-pointer ${theme ? "bg-[var(--bg)]" : "bg-[#262421]"}`}
      />
      <NavButton
        onClick={goForward}
        icon={<img src={rightArrow} alt="forward" />}
        className={`rounded-full border-1 border-[#CEB86E33] py-2.5 px-6 hover:bg-[#333] transition-all cursor-pointer ${theme ? "bg-[var(--bg)]" : "bg-[#262421]"}`}
      />
      <NavButton
        onClick={goLast}
        icon={<img src={skipNext} alt="last" />}
        className={`p-3 rounded-full hover:bg-[#333] transition-all cursor-pointer ${theme ? "bg-[var(--bg)]" : "bg-[#262421]"}`}
      />
    </div>
  );
};

export default AnalyzeButtons;

import { NavButton } from "../../helpers/buttons";

import play from "../../assets/icons/analyze/play.svg";
import skipBack from "../../assets/icons/analyze/skipBack.svg";
import skipNext from "../../assets/icons/analyze/skipNext.svg";
import leftArrow from "../../assets/icons/analyze/leftArrow.svg";
import rightArrow from "../../assets/icons/analyze/rightArrow.svg";

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
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <NavButton
        onClick={goFirst}
        icon={<img src={skipBack} alt="first" />}
        className="p-3 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer"
      />

      <NavButton
        onClick={goBack}
        icon={<img src={leftArrow} alt="back" />}
        className="p-3 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer"
      />

      <NavButton
        icon={<img src={play} alt="play" />}
        className="p-3 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer"
      />
      <NavButton
        onClick={goForward}
        icon={<img src={rightArrow} alt="forward" />}
        className="p-3 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer"
      />
      <NavButton
        onClick={goLast}
        icon={<img src={skipNext} alt="last" />}
        className="p-3 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer"
      />
    </div>
  );
};

export default AnalyzeButtons;

import { NavButton } from "../../helpers/buttons";
import leftArrow from "../../assets/icons/analyze/leftArrow.svg";
import rightArrow from "../../assets/icons/analyze/rightArrow.svg";
import firstIcon from "../../assets/icons/analyze/firstMove.svg";
import nextIcon from "../../assets/icons/analyze/nextMove.svg";
import fullReport from "../../assets/icons/analyze/fullReport.svg";

interface AnalyzeButtonsProps {
  plyIndex?: number;
  goBack?: () => void;
  goForward?: () => void;
  goFirst?: () => void;
  goLast?: () => void;
}

const AnalyzeButtons: React.FC<AnalyzeButtonsProps> = ({
  goBack,
  goForward,
  goFirst,
  goLast,
}) => {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-4">
      <NavButton
        icon={<img src={firstIcon} alt="firstIcon" />}
        label="First Move"
        onClick={goFirst}
      />
      <NavButton
        onClick={goBack}
        icon={<img src={leftArrow} alt="prevIcon" />}
        label="Previous"
      />

      <button
        type="button"
        className="bg-[#e9cf8b] hover:bg-[#d4af37] disabled:opacity-40 disabled:cursor-not-allowed text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(233,207,139,0.3)]"
        onClick={goForward}
      >
        <img src={nextIcon} alt="nextIcon" />
        Next Move
      </button>

      <NavButton
        icon={<img src={rightArrow} alt="rightArrow" />}
        label="Last Move"
        isLight
        onClick={goLast}
      />
      <NavButton
        icon={<img src={fullReport} alt="fullReport" />}
        label="Full Report"
      />
    </div>
  );
};

export default AnalyzeButtons;

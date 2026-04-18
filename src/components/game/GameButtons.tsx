import { NavButton } from "../../helpers/buttons";

import newGame from "../../assets/icons/game/newGame.svg";
import resign from "../../assets/icons/game/sign.svg";
import colors from "../../assets/icons/game/colors.svg";

interface Props {
  goFirst?: () => void;
  getColors?: () => void;
}

export const GameButtons: React.FC<Props> = ({ getColors, goFirst }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <NavButton
        text="New Game"
        onClick={goFirst}
        icon={<img src={newGame} alt="newGame" width={24} height={24} />}
        className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer border-1 shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
      />

      <NavButton
        text="Resign"
        icon={<img src={resign} alt="resign" width={24} height={24} />}
        className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer border-1 shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
      />

      <NavButton
        text="Board Colors"
        onClick={getColors}
        icon={<img src={colors} alt="colors" width={24} height={24} />}
        className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#333] transition-all cursor-pointer border-1 shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
      />
    </div>
  );
};

export default GameButtons;

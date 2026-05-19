import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { NavButton } from "../../helpers/buttons";
import { type BoardTheme, BOARD_THEMES } from "./board-theme/boardThemes";
import { BoardThemeModal } from "./board-theme/BoardThemeModal";

import newGame from "../../assets/icons/game/newGame.svg";
import resign from "../../assets/icons/game/sign.svg";
import colors from "../../assets/icons/game/colors.svg";

interface Props {
  goFirst?: () => void;
  onThemeChange?: (theme: BoardTheme) => void;
}

export const GameButtons: React.FC<Props> = ({ goFirst, onThemeChange }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<BoardTheme>(
    BOARD_THEMES[0],
  );

  const handleSelectTheme = (theme: BoardTheme) => {
    setSelectedTheme(theme);
    onThemeChange?.(theme);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-4">
        <NavButton
          text={t("new_game")}
          onClick={goFirst}
          icon={<img src={newGame} alt="newGame" width={24} height={24} />}
          className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
        />

        <NavButton
          text={t("resign")}
          icon={<img src={resign} alt="resign" width={24} height={24} />}
          className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
        />

        <NavButton
          text={t("board_colors")}
          onClick={() => setIsModalOpen(true)}
          icon={<img src={colors} alt="colors" width={24} height={24} />}
          className="flex items-center gap-x-3 px-6 py-2.5 bg-[#262421] rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D]"
        />
      </div>

      <BoardThemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTheme={selectedTheme}
        onSelect={handleSelectTheme}
      />
    </>
  );
};

export default GameButtons;

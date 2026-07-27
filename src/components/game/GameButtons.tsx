import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";
import { NavButton } from "../../helpers/buttons";
import { type BoardTheme, BOARD_THEMES } from "./board-theme/boardThemes";
import { BoardThemeModal } from "./board-theme/BoardThemeModal";

import { NewGameIcon } from "../../assets/icons/game/newGame";
import { ColorsIcon } from "../../assets/icons/game/colors";
import { ReSignIcon } from "../../assets/icons/game/sign";

interface Props {
  goFirst?: () => void;
  onThemeChange?: (theme: BoardTheme) => void;
}

export const GameButtons: React.FC<Props> = ({ goFirst, onThemeChange }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
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
          icon={<NewGameIcon />}
          className={`flex items-center gap-x-3 px-6 py-2.5 rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D] ${theme === "dark" ? "bg-[#262421]" : "bg-[#FFFFFF] text-[#374151]"}`}
        />

        <NavButton
          text={t("resign")}
          icon={<ReSignIcon />}
          className={`flex items-center gap-x-3 px-6 py-2.5 rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D] ${theme === "dark" ? "bg-[#262421]" : "bg-[#DA77560D] text-[#374151]"}`}
        />

        <NavButton
          text={t("board_colors")}
          onClick={() => setIsModalOpen(true)}
          icon={<ColorsIcon />}
          className={`flex items-center gap-x-3 px-6 py-2.5 rounded-full hover:bg-[#E5CC7A4D] transition-all cursor-pointer border-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] border-[#E5CC7A4D] ${theme === "dark" ? "bg-[#262421]" : "bg-[#FFFFFF] text-[#374151]"}`}
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

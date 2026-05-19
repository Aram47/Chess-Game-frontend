import React from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { BOARD_THEMES, type BoardTheme } from "./boardThemes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTheme: BoardTheme;
  onSelect: (theme: BoardTheme) => void;
}

export const BoardThemeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedTheme,
  onSelect,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1A17] border border-[#CEB86E33] rounded-[20px] p-8 w-[336px] shadow-[0px_8px_32px_0px_#1C1C1C80] backdrop-blur-[100px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#E5CC7A] text-base font-normal">
            {t("choose_board_theme")}
          </h2>
          <button
            onClick={onClose}
            className="text-[#A39589] hover:text-white transition-colors text-2xl leading-none absolute top-4 right-4"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {BOARD_THEMES.map((theme) => {
            const isSelected = theme.nameKey === selectedTheme.nameKey;
            return (
              <button
                key={theme.nameKey}
                onClick={() => {
                  onSelect(theme);
                  onClose();
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#E5CC7A] bg-[#E5CC7A1A]"
                    : "border-[#FFFFFF1A] bg-[#FFFFFF08] hover:border-[#FFFFFF33]"
                }`}
              >
                <div className="flex rounded-md gap-2 overflow-hidden w-full h-[30px]">
                  <div
                    className="w-1/2 h-full rounded-[4px]"
                    style={{ backgroundColor: theme.light }}
                  />
                  <div
                    className="w-1/2 h-full rounded-[4px]"
                    style={{ backgroundColor: theme.dark }}
                  />
                </div>
                <span className="text-[#E5CC7A] text-xs">
                  {t(theme.nameKey)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

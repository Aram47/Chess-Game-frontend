import React from "react";
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
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#E5CC7A] text-base font-normal">
            Choose Board Theme
          </h2>
          <button
            onClick={onClose}
            className="text-[#A39589] hover:text-white transition-colors text-2xl leading-none absolute top-4 right-4"
          >
            ✕
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {BOARD_THEMES.map((theme) => {
            const isSelected = theme.name === selectedTheme.name;
            return (
              <button
                key={theme.name}
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
                {/* Color preview — mini board swatch */}
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
                <span className="text-[#E5CC7A] text-xs">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

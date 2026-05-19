import { useState } from "react";
import type { BotLevel } from "../../types/gameType";
import type { StringKey } from "../../constants/strings";
import { useTranslation } from "../../hooks/useTranslation";
import { StartGameButton } from "./StartGameButton";

const LEVELS: {
  id: BotLevel;
  titleKey: StringKey;
  subtitleKey: StringKey;
  titleClass: string;
  bgClass: string;
  borderSelected: string;
}[] = [
  {
    id: "easy",
    titleKey: "easy",
    subtitleKey: "beginner_friendly",
    titleClass: "text-[#307D24]",
    bgClass: "bg-[rgba(127,196,116,0.1)]",
    borderSelected: "border-[#307D24]",
  },
  {
    id: "medium",
    titleKey: "medium",
    subtitleKey: "balanced_challenge",
    titleClass: "text-[#B7A362]",
    bgClass: "bg-[rgba(183,163,98,0.1)]",
    borderSelected: "border-[#B7A362]",
  },
  {
    id: "hard",
    titleKey: "hard",
    subtitleKey: "expert_level",
    titleClass: "text-[#AD1414]",
    bgClass: "bg-[rgba(173,20,20,0.1)]",
    borderSelected: "border-[#AD1414]",
  },
];

interface BotDifficultyPanelProps {
  onStart: (level: BotLevel) => void;
  isStarting?: boolean;
}

export function BotDifficultyPanel({ onStart, isStarting }: BotDifficultyPanelProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<BotLevel>("easy");

  return (
    <div
      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(206,184,110,0.2)] rounded-[20px] p-8 flex flex-col items-center gap-8"
      role="tabpanel"
      aria-label={t("select_difficulty")}
    >
      <h2 className="w-full text-2xl font-medium text-[#CFCFCF] text-left">
        {t("select_difficulty")}
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-[386px]">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => setSelected(level.id)}
            className={`flex flex-col items-center justify-center w-full h-[72px] rounded-[90px] cursor-pointer transition-all border ${
              level.bgClass
            } ${
              selected === level.id
                ? `${level.borderSelected} border`
                : "border-transparent"
            }`}
            aria-pressed={selected === level.id}
          >
            <span className={`text-xl font-medium ${level.titleClass}`}>
              {t(level.titleKey)}
            </span>
            <span className="text-sm text-[#A39589]">{t(level.subtitleKey)}</span>
          </button>
        ))}
      </div>

      <StartGameButton
        onClick={() => onStart(selected)}
        loading={isStarting}
      />
    </div>
  );
}

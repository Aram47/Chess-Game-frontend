import themeIcon from "../../assets/icons/problems/themes.svg";
import difficulty from "../../assets/icons/problems/difficulty.svg";
import { useState } from "react";
import arrow from "../../assets/icons/problems/topArrow.svg";
import {
  DIFFICULTY_FILTERS,
  type Difficulty,
  type ProblemTheme,
} from "../../types/problemType";
import { useTranslation } from "../../hooks/useTranslation";
import type { StringKey } from "../../constants/strings";

interface Props {
  themeFilter: ProblemTheme | "All";
  setThemeFilter: (value: ProblemTheme | "All") => void;
  diffFilter: "All" | Difficulty;
  setDiffFilter: (value: "All" | Difficulty) => void;
}

const THEME_LABEL_KEYS: Record<ProblemTheme | "All", StringKey> = {
  All: "filter_all",
  Tactical: "filter_tactical",
  Endgame: "filter_endgame",
  Opening: "filter_opening",
  Positional: "filter_positional",
};

const DIFFICULTY_LABEL_KEYS: Record<"All" | Difficulty, StringKey> = {
  All: "filter_all",
  Beginner: "difficulty_beginner",
  Intermediate: "difficulty_intermediate",
  Advanced: "difficulty_advanced",
  Expert: "difficulty_expert",
};

const THEME_FILTERS: Array<"All" | ProblemTheme> = [
  "All",
  "Tactical",
  "Endgame",
  "Opening",
  "Positional",
];

const SelectProblems = ({
  diffFilter,
  setDiffFilter,
  themeFilter,
  setThemeFilter,
}: Props) => {
  const { t } = useTranslation();
  const [themeOpen, setThemeOpen] = useState(false);
  const [diffOpen, setDiffOpen] = useState(false);

  return (
    <article
      className="flex items-center justify-end max-w-[370px] text-end gap-2.5 float-right
                   bg-white/[0.05] shadow-[0px_4px_20px_0px_rgba(28,28,28,0.3)] px-4 py-2.5 rounded-[41px] mb-8"
    >
      <div className="inline-flex items-center gap-x-3 bg-white/[0.07] border border-[rgba(206,184,110,0.2)] rounded-[20px] px-3.5 py-1.5 outline-none appearance-none">
        <img src={themeIcon} alt="theme" width={20} height={20} />

        <div className="relative">
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="whitespace-nowrap w-full text-left text-[#e8e2d0] text-[13px] cursor-pointer flex items-center gap-1"
          >
            {t(THEME_LABEL_KEYS[themeFilter])}
            <span className="ml-2 flex-shrink-0">
              {themeOpen ? (
                <img
                  src={arrow}
                  alt="bottomArrow"
                  className="duration-800 transition-all"
                  style={{ transform: "rotate(-180deg)" }}
                />
              ) : (
                <img
                  src={arrow}
                  alt="topArrow"
                  className="duration-800 transition-all"
                />
              )}
            </span>
          </button>

          {themeOpen && (
            <ul className="absolute z-10 min-w-full -right-[18px] top-[35px] mt-1 bg-[#2E2E2E] rounded-[20px] overflow-hidden shadow-lg text-left border border-[#CEB86E33]">
              {THEME_FILTERS.map((value) => (
                <li
                  key={value}
                  onClick={() => {
                    setThemeFilter(value);
                    setThemeOpen(false);
                  }}
                  className="px-3 py-2 text-[#e8e2d0] text-[13px] cursor-pointer
                          hover:bg-[#a39589] hover:text-[#E5CC7A] transition-colors"
                >
                  {t(THEME_LABEL_KEYS[value])}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className="inline-flex items-center gap-x-3 bg-white/[0.07] border px-3.5 py-1.5
                     border-[rgba(206,184,110,0.2)] rounded-[20px] outline-none appearance-none"
      >
        <img src={difficulty} alt="difficulty" width={20} height={20} />

        <div className="relative">
          <button
            onClick={() => setDiffOpen(!diffOpen)}
            className="whitespace-nowrap w-full text-left text-[#e8e2d0] text-[13px] cursor-pointer flex items-center gap-1"
          >
            {t(DIFFICULTY_LABEL_KEYS[diffFilter])}
            <span className="ml-2 flex-shrink-0">
              {diffOpen ? (
                <img
                  src={arrow}
                  alt="bottomArrow"
                  style={{ transform: "rotate(-180deg)" }}
                  className="duration-800 transition-all"
                />
              ) : (
                <img
                  src={arrow}
                  alt="topArrow"
                  className="duration-800 transition-all"
                />
              )}
            </span>
          </button>

          {diffOpen && (
            <ul className="absolute z-10 min-w-full -right-[12px] top-[35px] mt-1 bg-[#2E2E2E] rounded-[20px] overflow-hidden shadow-lg text-left border border-[#CEB86E33]">
              {DIFFICULTY_FILTERS.map((value) => (
                <li
                  key={value}
                  onClick={() => {
                    setDiffFilter(value as "All" | Difficulty);
                    setDiffOpen(false);
                  }}
                  className="px-3 py-2 text-[#e8e2d0] text-[13px] cursor-pointer
                              hover:bg-[#a39589] hover:text-[#E5CC7A] transition-colors"
                >
                  {t(DIFFICULTY_LABEL_KEYS[value as "All" | Difficulty])}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
};

export default SelectProblems;

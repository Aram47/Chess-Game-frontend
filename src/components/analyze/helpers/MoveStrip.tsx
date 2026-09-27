import { useEffect, useMemo, useRef } from "react";
import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "../../../hooks/useTranslation";
import type { MoveType } from "../../../types/gameType";

const formatMove = (move: string | MoveType): string => {
  if (typeof move === "string") return move;
  return `${move.from}${move.to}${move.promotion ?? ""}`;
};

export function MoveStrip() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { selectedGame, plyIndex, setPlyIndex } = useChessAnalysis();
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const movePairs = useMemo(() => {
    if (!selectedGame) return [];
    const moves = selectedGame.allMoves;
    const pairs: {
      white: string;
      black?: string;
      whitePly: number;
      blackPly: number;
    }[] = [];
    for (let i = 0; i < moves.length; i += 2) {
      pairs.push({
        white: formatMove(moves[i]),
        black: moves[i + 1] ? formatMove(moves[i + 1]) : undefined,
        whitePly: i + 1,
        blackPly: i + 2,
      });
    }
    return pairs;
  }, [selectedGame]);

  useEffect(() => {
    const node = activeRef.current;
    const strip = stripRef.current;
    if (!node || !strip) return;
    const top = node.offsetTop - strip.offsetTop;
    const bottom = top + node.offsetHeight;
    if (top < strip.scrollTop) strip.scrollTop = top;
    else if (bottom > strip.scrollTop + strip.clientHeight) {
      strip.scrollTop = bottom - strip.clientHeight;
    }
  }, [plyIndex]);

  return (
    <div className="shrink-0">
      <p
        className={`mb-1 text-xs tracking-widest uppercase ${theme === "dark" ? "text-[#FCFAF2]" : "text-[var(--text)]"}`}
      >
        {t("all_moves")}
      </p>
      {!selectedGame ? (
        <p className="text-xs text-[#676767]">{t("select_game_moves")}</p>
      ) : movePairs.length === 0 ? (
        <p className="text-xs text-[#676767]">{t("no_moves_recorded")}</p>
      ) : (
        <div
          ref={stripRef}
          className="max-h-24 overflow-y-auto pr-1"
        >
          {movePairs.map((pair, i) => (
            <div
              key={i}
              className="grid grid-cols-[2.5rem_1fr_1fr] items-center gap-1"
            >
              <span className="text-center font-mono text-xs text-[#4a4540]">
                {i + 1}.
              </span>
              <button
                type="button"
                ref={plyIndex === pair.whitePly ? activeRef : null}
                onClick={() => setPlyIndex(pair.whitePly)}
                className={`min-h-8 rounded-md px-2 text-left font-mono text-sm ${theme === "light" ? "text-[#DA7756]" : "text-[#e5cc7a]"} ${plyIndex === pair.whitePly ? "bg-[#E5CC7A33]" : ""}`}
              >
                {pair.white}
              </button>
              {pair.black ? (
                <button
                  type="button"
                  ref={plyIndex === pair.blackPly ? activeRef : null}
                  onClick={() => setPlyIndex(pair.blackPly)}
                  className={`min-h-8 rounded-md px-2 text-left font-mono text-sm ${theme === "light" ? "text-[var(--text)]" : "text-[#F7EFD6]"} ${plyIndex === pair.blackPly ? "bg-[#E5CC7A33]" : ""}`}
                >
                  {pair.black}
                </button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

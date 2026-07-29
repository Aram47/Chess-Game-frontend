import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { Bot } from "lucide-react";
import { useMemo, useEffect, useRef } from "react";
import type { MoveType } from "../../../types/gameType";
import AllPlayedGames from "../AllPlayedGames";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTheme } from "../../../context/ThemeContext";

const formatMove = (move: string | MoveType): string => {
  if (typeof move === "string") return move;
  return `${move.from}${move.to}${move.promotion ?? ""}`;
};

const AnalyzeColumn = ({
  winner,
}: {
  winner: "you" | "bot" | "draw" | null;
}) => {
  const { t } = useTranslation();
  const { selectedGame, plyIndex, setPlyIndex, setSelectedGameId, games } =
    useChessAnalysis();
  const { theme } = useTheme();
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [plyIndex]);

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

  const winnerPlayer = winner ? t("win") : t("loss");

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* All Moves */}
      <div
        className={`${theme === "dark" ? "bg-[#262421]" : "bg-[var(--bg)]"} border border-[#CEB86E33] rounded-xl p-6`}
      >
        <h2
          className={`${theme === "dark" ? "text-[#FCFAF2]" : "text-[var(--text)]"} mb-4 text-xs tracking-widest uppercase font-medium`}
        >
          {t("all_moves")}
        </h2>

        {!selectedGame ? (
          <p className="text-[#676767] text-xs text-center py-6">
            {t("select_game_moves")}
          </p>
        ) : movePairs.length === 0 ? (
          <p className="text-[#676767] text-xs text-center py-6">
            {t("no_moves_recorded")}
          </p>
        ) : (
          <div className="max-h-[600px] overflow-y-auto pr-1 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {movePairs.map((pair, i) => (
              <div
                key={i}
                className="grid grid-cols-[60px_1fr_1fr] items-center gap-2"
              >
                {/* Move number */}
                <span
                  className={`text-center font-mono rounded-[10px] px-6 py-3 text-[#4a4540] font-mono text-md ${theme === "light" ? "bg-[#F0F0F0CC]" : "bg-[#00000033]"}`}
                >
                  {i + 1}.
                </span>

                {/* White move */}
                <button
                  ref={plyIndex === pair.whitePly ? activeRef : null}
                  onClick={() => setPlyIndex(pair.whitePly)}
                  className={`text-left font-mono px-4 py-2.5 border-1 border-[#E5CC7A1A] transition-all duration-150 cursor-pointer rounded-[10px]  ${theme === "light" ? "bg-[#F0F0F0CC] text-[#DA7756]" : "bg-[#00000033] text-[#e5cc7a]"}`}
                >
                  {pair.white}
                </button>

                {/* Black move */}
                {pair.black ? (
                  <button
                    ref={plyIndex === pair.blackPly ? activeRef : null}
                    onClick={() => setPlyIndex(pair.blackPly)}
                    className={`text-left font-mono px-4 py-2.5 rounded transition-all duration-150 border-1 border-[#E5CC7A1A] cursor-pointer rounded-[10px] ${theme === "light" ? "bg-[#F0F0F0CC] text-[var(--text)]" : "bg-[#00000033] text-[#F7EFD6]"}`}
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

      {/* History Selection */}
      {!selectedGame ? (
        <AllPlayedGames games={games} />
      ) : (
        <div
          className={`${theme === "dark" ? "bg-[#262421]" : "bg-[var(--bg)]"} border border-[#CEB86E33] rounded-xl p-8 flex flex-col flex-1`}
        >
          <div className="flex justify-between">
            <h2
              className={`mb-4 text-xs font-bold ${theme === "dark" ? "text-[#E5CC7A]" : "text-[#da7756]"}`}
            >
              {t("game_history")}
            </h2>
            <p className="text-[#A39589] font-normal">
              {t("games_count", { count: games.length })}
            </p>
          </div>

          <div className="space-y-4 overflow-y-auto mt-4">
            {games.map((game) => (
              <button
                key={game._id}
                onClick={() => setSelectedGameId(game._id)}
                className={`w-full text-left py-2.5 px-3 rounded-[10px] transition-all ${
                  selectedGame?._id === game._id
                    ? "bg-[#1C1C1C4D]"
                    : "border-white/5 hover:bg-white/5"
                }
                    ${theme === "dark" ? "bg-[#1C1C1C4D]" : "bg-[#F3F3F3FF]"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-3">
                    {game.isBot && (
                      <div className="rounded-full bg-[#E5CC7A14] py-2 px-3 flex justify-center items-center">
                        <Bot size={24} className="text-[#374151FF]" />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-1">
                      <span
                        className={`text-sm font-normal ${theme === "dark" ? "text-[#F7F7F7]" : "text-[var(--text)]"}`}
                      >
                        {game.isBot ? t("bot_name") : t("vs_player")}
                      </span>
                      <p className="text-xs text-[#676767]">
                        {new Date(game.finishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <span className="text-xs text-[#AD1414] bg-[#EF66661A] py-1.5 px-3 rounded-[8px]">
                      {winnerPlayer}
                    </span>
                    <span className="text-sm text-[#787878] font-normal">
                      {t("moves_count", { count: game.allMoves.length })}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeColumn;

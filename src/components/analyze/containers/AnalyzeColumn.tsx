import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { Bot, Loader2 } from "lucide-react";
import AllPlayedGames from "../AllPlayedGames";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTheme } from "../../../context/ThemeContext";
import { usePositionAnalysis } from "../../../hooks/usePositionAnalysis";
import { formatEvalLabel } from "../helpers/EvalBar";
import controls from "../../../assets/icons/analyze/controls.svg";
import type { StringKey } from "../../../constants/strings";

const AnalyzeColumn = ({
  fen,
  playerColor = "w",
}: {
  fen: string;
  playerColor?: "w" | "b";
}) => {
  const { t } = useTranslation();
  const { selectedGame, setSelectedGameId, games } = useChessAnalysis();
  const { theme } = useTheme();
  const analysisQuery = usePositionAnalysis(fen, Boolean(fen));
  const bestLine = analysisQuery.data?.lines?.[0];
  const playerSideKey: StringKey = playerColor === "w" ? "white" : "black";
  const evalLabel = bestLine ? formatEvalLabel(bestLine.evaluation) : null;
  const bestMoveLabel = bestLine
    ? `${bestLine.move.from} → ${bestLine.move.to}`
    : null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-y-auto rounded-xl border border-[#CEB86E33] p-4 ${theme === "dark" ? "bg-[#262421]" : "bg-[var(--bg)]"}`}
      >
        <h2
          className={`mb-3 text-xs font-medium tracking-widest uppercase ${theme === "dark" ? "text-[#FCFAF2]" : "text-[var(--text)]"}`}
        >
          {t("engine_suggestion")}
        </h2>
        {analysisQuery.isLoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-[#A39589]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">{t("analyzing_position")}</span>
          </div>
        )}
        {analysisQuery.isError && (
          <p className="py-4 text-center text-sm text-[#AD1414]">
            {t("analysis_unavailable")}
          </p>
        )}
        {bestLine && !analysisQuery.isLoading && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-[#A39589]">
              {t("best_line_for", { color: t(playerSideKey) })}
              {evalLabel ? ` · ${evalLabel}` : ""}
            </p>
            <p className="text-sm text-[#E5CC7A]">
              {t("recommended_move")}{" "}
              <b className="tabular-nums text-[#CFCFCF]">{bestMoveLabel}</b>
            </p>
            {analysisQuery.data?.lines && analysisQuery.data.lines.length > 1 && (
              <div className="flex items-start gap-x-2 rounded-lg bg-[#1C1C1C4D] px-3 py-2">
                <img src={controls} alt="" width={16} height={16} />
                <p className="text-xs font-medium text-[#A39589]">
                  {t("alternatives")}{" "}
                  {analysisQuery.data.lines
                    .slice(1, 3)
                    .map((line) => `${line.move.from}→${line.move.to}`)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
        {!bestLine && !analysisQuery.isLoading && !analysisQuery.isError && (
          <p className="py-4 text-center text-sm text-[#A39589]">
            {t("no_engine_lines")}
          </p>
        )}
      </div>

      {/* History Selection */}
      {!selectedGame ? (
        <AllPlayedGames games={games} />
      ) : (
        <div
          className={`${theme === "dark" ? "bg-[#262421]" : "bg-[var(--bg)]"} flex max-h-40 min-h-0 shrink-0 flex-col overflow-hidden rounded-xl border border-[#CEB86E33] p-4`}
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

          <div className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto">
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

                  <span className="text-sm font-normal text-[#787878]">
                    {t("moves_count", { count: game.allMoves.length })}
                  </span>
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

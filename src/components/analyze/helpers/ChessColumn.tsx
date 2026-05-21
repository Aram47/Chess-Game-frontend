import { Chessboard } from "react-chessboard";
import { useMemo, useState, type CSSProperties } from "react";
import { useChessboardInteraction } from "../../../hooks/useChessboardInteraction";
import {
  BOARD_THEMES,
  type BoardTheme,
} from "../../game/board-theme/boardThemes";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
import controls from "../../../assets/icons/analyze/controls.svg";
// import "./style.scss";
import AnalyzeButtons from "./AnalyzeButtons";
import { usePositionAnalysis } from "../../../hooks/usePositionAnalysis";
import { Loader2 } from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";
import type { StringKey } from "../../../constants/strings";

type AnalyzeControls = {
  goBack: () => void;
  goForward: () => void;
  goFirst: () => void;
  goLast: () => void;
};

export const ChessColumn = ({
  opponentName,
  playerName,
  fen,
  onDrop,
  isPlayerTurn,
  lastMove,
  gameStatus,
  resetGame,
  playerColor,
  isBotThinking,
  winner,
  boardTheme,
  analyzeControls,
  enableAnalysis = false,
}: {
  opponentName?: string;
  playerName?: string;
  fen: string;
  onDrop: (source: string, target: string) => boolean | Promise<boolean>;
  isPlayerTurn: boolean;
  lastMove: { from: string; to: string } | null;
  gameStatus: string;
  resetGame?: () => void;
  playerColor?: "w" | "b";
  isBotThinking?: boolean;
  winner: "you" | "bot" | "draw" | null;
  boardTheme?: BoardTheme;
  analyzeControls?: AnalyzeControls;
  enableAnalysis?: boolean;
}) => {
  const { t } = useTranslation();
  const winnerPlayer = winner ? t("win") : t("loss");
  const boardOrientation = playerColor === "w" ? "white" : "black";
  const playerSideKey: StringKey = playerColor === "w" ? "white" : "black";
  const opponentSideKey: StringKey = playerColor === "w" ? "black" : "white";
  const theme = boardTheme ?? BOARD_THEMES[0];
  const [showPiece, setShowPiece] = useState(false);

  const analysisEnabled = Boolean(enableAnalysis && analyzeControls && fen);
  const analysisQuery = usePositionAnalysis(fen, analysisEnabled && showPiece);
  const bestLine = analysisQuery.data?.lines?.[0];
  const bestMoveLabel = bestLine
    ? `${bestLine.move.from} → ${bestLine.move.to}`
    : null;
  const evalLabel =
    bestLine?.evaluation.kind === "mate"
      ? t("mate_in", { count: Math.abs(bestLine.evaluation.value) })
      : bestLine
        ? `${(bestLine.evaluation.value / 100).toFixed(2)} cp`
        : null;
  const lastMoveStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (lastMove) {
      styles[lastMove.from] = {
        backgroundColor: "rgba(225, 200, 100, 0.4)",
      };
      styles[lastMove.to] = {
        backgroundColor: "rgba(225, 200, 100, 0.6)",
      };
    }
    return styles;
  }, [lastMove]);

  const canInteract =
    gameStatus === "playing" && isPlayerTurn && !isBotThinking;

  const boardInteraction = useChessboardInteraction({
    fen,
    playerColor,
    canInteract,
    onMove: onDrop,
    baseSquareStyles: lastMoveStyles,
  });

  return (
    <div className="flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
      {/* Bot Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#1C1C1C] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#1C1C1C]">♚</span>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-gold capitalize">
              {opponentName || t("platform")}
            </h3>
            <p className="text-[#A39589] text-sm">
              {t("playing_color", { color: t(opponentSideKey) })}
            </p>
          </div>
        </div>

        <p className="text-xl text-[#AD1414] bg-[#EF66661A] py-2 px-4 rounded-[10px]">
          {winnerPlayer}
        </p>
      </div>

      {/* Board */}
      <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
        <div className="board">
          <Chessboard
            options={{
              position: fen,
              boardOrientation,
              allowDragging: boardInteraction.allowDragging,
              canDragPiece: boardInteraction.canDragPiece,
              onPieceDrop: boardInteraction.onPieceDrop,
              onSquareClick: boardInteraction.onSquareClick,
              pieces: figurePieces,
              squareStyles: boardInteraction.squareStyles,
              darkSquareStyle: {
                backgroundColor: theme.dark,
                color: theme.light,
              },
              lightSquareStyle: {
                backgroundColor: theme.light,
                color: theme.dark,
              },
            }}
          />
        </div>

        {gameStatus !== "playing" && gameStatus !== "idle" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
            <h2 className="text-white text-2xl mb-4">
              {winner === "you"
                ? t("you_win")
                : winner === "bot"
                  ? t("bot_wins")
                  : winner === "draw"
                    ? t("draw_result")
                    : gameStatus.toUpperCase()}
            </h2>
            <button
              onClick={resetGame}
              className="bg-[#E5CC7A] px-4 py-2 rounded"
            >
              {t("new_game")}
            </button>
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-3xl">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#FFFFFF] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#FFFFFF]">♚</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#E5CC7A]">{playerName || t("me")}</h3>
            <p className="text-[#A39589]">
              {t("playing_color", { color: t(playerSideKey) })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="bg-[#0000004D] rounded-[20px] justify-center p-4 text-sm text-[#F7EFD6] w-full mx-auto text-center">
          <p className="font-normal text-xs text-[#F7EFD6]">
            {t("current_move")}
          </p>
        </div>
        <button
          className="w-[184px] bg-[linear-gradient(180deg,#E5CC7A_0%,#F4E09E_100%)] rounded-full text-[#1C1C1C] font-semibold text-sm hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] py-3 cursor-pointer"
          onClick={() => setShowPiece(!showPiece)}
        >
          {t("analyze_btn")}
        </button>
      </div>
      <div className="flex flex-col items-center gap-y-6 ">
        <h2 className="text-[#A39589]">{t("ai_insights_desc")}</h2>
        {showPiece && analysisEnabled && (
          <div className="flex flex-col gap-y-4 bg-[#FFFFFF0D] py-3 px-4 rounded-[20px] w-full">
            {analysisQuery.isLoading && (
              <div className="flex items-center justify-center gap-2 py-6 text-[#A39589]">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">{t("analyzing_position")}</span>
              </div>
            )}
            {analysisQuery.isError && (
              <p className="text-sm text-[#AD1414] text-center py-4">
                {t("analysis_unavailable")}
              </p>
            )}
            {bestLine && !analysisQuery.isLoading && (
              <>
                <div className="flex items-center gap-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3A92F91A]">
                    <span className="text-xl text-[#3A92F9]">
                      {t("ai_label")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#CFCFCF] font-normal">
                      {t("engine_suggestion")}
                    </h3>
                    <p className="text-[#A39589] text-sm">
                      {t("best_line_for", { color: t(playerSideKey) })}
                      {evalLabel ? ` · ${evalLabel}` : ""}
                    </p>
                  </div>
                </div>
                <p className="text-[#E5CC7A] text-sm">
                  {t("recommended_move")}{" "}
                  <b className="text-[#CFCFCF] tabular-nums">{bestMoveLabel}</b>
                </p>
                {analysisQuery.data?.lines &&
                  analysisQuery.data.lines.length > 1 && (
                    <div className="flex items-start gap-x-2 py-3 px-4 bg-[#1C1C1C4D] rounded-[8px]">
                      <img src={controls} alt="" width={16} height={16} />
                      <p className="text-[#A39589] font-medium text-xs">
                        {t("alternatives")}{" "}
                        {analysisQuery.data.lines
                          .slice(1, 3)
                          .map((line) => `${line.move.from}→${line.move.to}`)
                          .join(", ")}
                      </p>
                    </div>
                  )}
              </>
            )}
            {!bestLine &&
              !analysisQuery.isLoading &&
              !analysisQuery.isError && (
                <p className="text-sm text-[#A39589] text-center py-4">
                  {t("no_engine_lines")}
                </p>
              )}
          </div>
        )}

        <p className="text-[#A39589]">{t("use_arrow_keys")}</p>
      </div>

      {analyzeControls && <AnalyzeButtons {...analyzeControls} />}
    </div>
  );
};

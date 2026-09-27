import { Chessboard } from "react-chessboard";
import { useMemo, type CSSProperties } from "react";
import { useChessboardInteraction } from "../../../hooks/useChessboardInteraction";
import {
  BOARD_THEMES,
  type BoardTheme,
} from "../../game/board-theme/boardThemes";
import { useTheme } from "../../../context/ThemeContext";
import { usePositionAnalysis } from "../../../hooks/usePositionAnalysis";
import { useTranslation } from "../../../hooks/useTranslation";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
import type { StringKey } from "../../../constants/strings";
import AnalyzeButtons from "./AnalyzeButtons";
import { EvalBar } from "./EvalBar";
import { MoveStrip } from "./MoveStrip";

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
  const { theme } = useTheme();
  const boardOrientation = playerColor === "w" ? "white" : "black";
  const playerSideKey: StringKey = playerColor === "w" ? "white" : "black";
  const opponentSideKey: StringKey = playerColor === "w" ? "black" : "white";
  const themes = boardTheme ?? BOARD_THEMES[0];

  const analysisEnabled = Boolean(enableAnalysis && fen);
  const analysisQuery = usePositionAnalysis(fen, analysisEnabled);
  const evaluation = analysisQuery.data?.lines?.[0]?.evaluation ?? null;
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

  const lineClass =
    theme === "dark" ? "text-[#A39589]" : "text-[#5E6470]";

  return (
    <div
      className={`flex h-full min-h-0 flex-col gap-2 overflow-hidden rounded-[20px] border border-[#CEB86E33] p-3 ${theme === "dark" ? "bg-[#262421]" : "bg-[#FFFFFF]"}`}
    >
      <p className={`truncate text-sm ${lineClass}`}>
        <span className="text-[var(--gold)]">{opponentName || t("platform")}</span>
        {" · "}
        {t("playing_color", { color: t(opponentSideKey) })}
        {winner ? ` · ${winner === "you" ? t("you_win") : winner === "bot" ? t("bot_wins") : t("draw_result")}` : ""}
      </p>

      <div className="flex min-h-0 flex-1 items-stretch justify-center gap-2">
        <EvalBar
          evaluation={evaluation}
          orientation={boardOrientation}
          loading={analysisEnabled && analysisQuery.isLoading}
        />
        <div className="relative aspect-square h-full max-h-[600px] w-auto max-w-full overflow-hidden rounded-xl">
          <div className="board h-full w-full">
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
                  backgroundColor: themes.dark,
                  color: themes.light,
                },
                lightSquareStyle: {
                  backgroundColor: themes.light,
                  color: themes.dark,
                },
              }}
            />
          </div>
          {gameStatus !== "playing" && gameStatus !== "idle" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
              <h2 className="mb-4 text-2xl text-white">
                {winner === "you"
                  ? t("you_win")
                  : winner === "bot"
                    ? t("bot_wins")
                    : winner === "draw"
                      ? t("draw_result")
                      : gameStatus.toUpperCase()}
              </h2>
              <button
                type="button"
                onClick={resetGame}
                className="rounded bg-[#E5CC7A] px-4 py-2"
              >
                {t("new_game")}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className={`truncate text-sm ${lineClass}`}>
        <span className={theme === "dark" ? "text-[#E5CC7A]" : "text-[#DA7756]"}>
          {playerName || t("me")}
        </span>
        {" · "}
        {t("playing_color", { color: t(playerSideKey) })}
      </p>

      {enableAnalysis && <MoveStrip />}
      {analyzeControls && <AnalyzeButtons {...analyzeControls} />}
    </div>
  );
};

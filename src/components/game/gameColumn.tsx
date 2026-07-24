import { useLocation } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import type { CSSProperties } from "react";
import AnalyzeButtons from "../analyze/helpers/AnalyzeButtons";
import { BOARD_THEMES, type BoardTheme } from "./board-theme/boardThemes";
import { figurePieces } from "../../helpers/chess-figures/FiguresChess";
import GameButtons from "./GameButtons";
import { useChessboardInteraction } from "../../hooks/useChessboardInteraction";

import "../../assets/css/style.scss";
import type { ChessColor } from "../../types/gameType";
import { useTheme } from "../../context/ThemeContext";

type AnalyzeControls = {
  goBack: () => void;
  goForward: () => void;
  goFirst: () => void;
  goLast: () => void;
};

export const GameColumn = ({
  opponentName,
  playerName,
  fen,
  onDrop,
  isPlayerTurn,
  lastMove,
  gameStatus,
  resetGame,
  playerColor,
  level,
  isBotThinking,
  winner,
  boardTheme,
  startGameAgainstBot,
  setBoardTheme,
  analyzeControls,
  startLiveMatch,
  isLiveGame,
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
  level?: string;
  isBotThinking?: boolean;
  winner: "you" | "opponent" | "bot" | "draw" | null;
  boardTheme?: BoardTheme;
  setBoardTheme: React.Dispatch<React.SetStateAction<BoardTheme>>;
  startGameAgainstBot?: () => void;
  startLiveMatch?: () => void;
  isLiveGame?: boolean;
  analyzeControls?: AnalyzeControls;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isAnalysis = location.pathname.startsWith("/analyze");
  const [timers, setTimers] = useState({ white: 600, black: 600 });

  const boardOrientation = playerColor === "w" ? "white" : "black";
  const playerSideKey = playerColor === "w" ? "white" : "black";
  const opponentSideColor: ChessColor = playerColor === "w" ? "black" : "white";
  const activeTurn = fen.split(" ")[1] === "b" ? "black" : "white";
  const themes = boardTheme ?? BOARD_THEMES[0];
  const { theme } = useTheme();

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
    onMove: (from, to) => onDrop(from, to) as unknown as void,
    baseSquareStyles: lastMoveStyles,
  });

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timer = setInterval(() => {
      setTimers((prev) => {
        if (prev[activeTurn] <= 0) return prev;
        return {
          ...prev,
          [activeTurn]: prev[activeTurn] - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, activeTurn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 ${theme ? "bg-[var(--bg)]" : "bg-[#FFFFFF0D]"}`}
    >
      {/* Bot Info */}
      <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#1C1C1C] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#1C1C1C]">♚</span>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[var(--gold)] capitalize">
              {opponentName || t("platform")}
              {!isLiveGame && level
                ? ` (${t(level as "easy" | "medium" | "hard")})`
                : ""}
            </h3>
            <p className="text-[#A39589] text-sm">
              {t("playing_color", { color: t(opponentSideColor) })}
            </p>
          </div>
        </div>

        <p className="text-xl text-[#A39589] bg-[#0000004D] py-2 px-4 rounded-[10px]">
          {formatTime(timers[opponentSideColor])}
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

        {gameStatus === "waiting" && isLiveGame && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 gap-4 px-6 text-center">
            <h2 className="text-[#E5CC7A] text-2xl font-medium">
              {t("find_opponent_overlay_title")}
            </h2>
            <p className="text-[#A39589] text-sm max-w-xs">
              {t("find_opponent_overlay_desc")}
            </p>
          </div>
        )}

        {gameStatus !== "playing" &&
          gameStatus !== "idle" &&
          gameStatus !== "waiting" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
              <h2 className="text-white text-2xl mb-4">
                {winner === "you"
                  ? t("you_win")
                  : winner === "bot"
                    ? t("bot_wins")
                    : winner === "opponent"
                      ? t("opponent_wins")
                      : winner === "draw"
                        ? t("draw_result")
                        : gameStatus.toUpperCase()}
              </h2>
              <button
                onClick={resetGame}
                className="bg-[#E5CC7A] px-4 py-2 rounded text-[#1C1C1C] font-semibold"
              >
                {t("new_game")}
              </button>
            </div>
          )}
      </div>

      {/* Player Info */}
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-3xl ${theme ? "bg-[#F9F9F9FF]" : "bg-[#1C1C1C4D]"}`}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 border-2 border-[#FFFFFF] flex items-center justify-center rounded-full">
            <span className="text-2xl text-[#FFFFFF]">♚</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white">{playerName || t("me")}</h3>
            <p className="text-[#A39589]">
              {t("playing_color", { color: t(playerSideKey) })}
            </p>
          </div>
        </div>

        <p className="text-xl text-[#1C1C1C] bg-[#E5CC7A] py-2 px-4 rounded-[10px]">
          {formatTime(timers[playerSideKey as "white" | "black"])}
        </p>
      </div>
      <div className="bg-[#0000004D] rounded-xl justify-center p-4 text-sm text-[#F7EFD6] max-w-[70%] w-full mx-auto text-center">
        <p className="font-normal text-xs text-[#F7EFD6] ">
          {activeTurn === "white" ? t("white_to_move") : t("black_to_move")}
        </p>
      </div>
      {isAnalysis && analyzeControls ? (
        <AnalyzeButtons {...analyzeControls} />
      ) : (
        <GameButtons
          goFirst={isLiveGame ? startLiveMatch : startGameAgainstBot}
          onThemeChange={setBoardTheme}
        />
      )}
    </div>
  );
};

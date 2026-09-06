import { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { StringKey } from "../../constants/strings";
import { useGameHistory } from "../../hooks/useGameHistory";
import { BOARD_THEMES, type BoardTheme } from "./board-theme/boardThemes";

import { GameColumn } from "./gameColumn";
import GameHistory from "./gameHistory";
import SignInModal from "../modal/SignInModal";
import type { GamePageLocationState } from "../../types/playPageState";
import { LeftIcon } from "../../assets/icons/analyze/leftIcon.tsx";
import { useHistoryReplay } from "../../hooks/useHistoryReplay.tsx";
import { ConnectionBadge } from "../../helpers/games/ConnectionBadge.tsx";
import { LockedBoard } from "../../helpers/games/LockedBoard.tsx";
import { useTheme } from "../../context/ThemeContext";

// ─── Sub-components ───────────────────────────────────────────────────────────

const LEVEL_KEYS: Record<string, StringKey> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

export const ChessGamePage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pageState = (location.state as GamePageLocationState | null) ?? {};
  const { user } = useAuth();
  const {
    fen,
    gameStatus,
    playerColor,
    isLiveGame,
    isBotThinking,
    lastMove,
    moveHistory,
    winner,
    level,
    socketStatus,
    onDrop,
    startNewGame,
    isPlayerTurn,
    findMatch,
  } = useGame();

  const historyQuery = useGameHistory();
  const { theme } = useTheme();
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [boardTheme, setBoardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [plyIndex, setPlyIndex] = useState(0);

  const historyList = useMemo(
    () => historyQuery.data?.data ?? [],
    [historyQuery.data],
  );

  const { selectedGame, currentFen, isTerminal } = useHistoryReplay(
    selectedGameId,
    historyList,
    plyIndex,
  );

  const startGameAgainstBot = useCallback(() => {
    const color = Math.random() > 0.5 ? "w" : "b";
    const botLevel = pageState.level ?? level ?? "medium";
    void startNewGame(botLevel, color);
  }, [startNewGame, pageState.level, level]);

  const handleStartLiveMatch = useCallback(() => {
    if (!user) {
      setShowModalAuth(true);
      return;
    }
    findMatch();
  }, [user, findMatch]);

  const subtitle = useMemo(() => {
    if (isLiveGame) {
      if (gameStatus === "waiting") return t("matchmaking_waiting");
      return t("playing_vs_live");
    }
    const levelKey = LEVEL_KEYS[level] ?? "medium";
    return t("playing_vs_ai", { level: t(levelKey) });
  }, [isLiveGame, gameStatus, level, t]);

  return (
    <section className={`w-full flex flex-col grow pt-[170px] pb-16`}>
      <div className="text-white flex flex-col px-8 w-full">
        {/* Header */}
        <header className="flex items-center w-full text-center mb-8">
          <Link
            to="/play"
            state={{ tab: isLiveGame ? "live" : "platform" }}
            className={`w-[72px] flex justify-center border-2  py-2.5 rounded-3xl ${theme === "dark" ? "border-[#E5CC7A]" : "border-[#DA775626]"}`}
          >
            <LeftIcon theme={theme} />
          </Link>

          <div className="w-full flex flex-col items-center gap-1">
            <h1 className="text-4xl md:text-5xl text-[var(--gold)] font-medium tracking-tight">
              {isLiveGame ? t("live_game") : t("chess_game")}
            </h1>
            <p className="text-lg text-[#A39589] font-medium">{subtitle}</p>
            {isLiveGame && (
              <ConnectionBadge status={socketStatus} gameStatus={gameStatus} />
            )}
          </div>
        </header>

        {/* Body */}
        <div className="w-full flex items-start gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {user ? (
              <GameColumn
                fen={fen}
                opponentName={isLiveGame ? t("opponent") : t("bot")}
                playerName={t("you_label")}
                onDrop={onDrop}
                isPlayerTurn={isPlayerTurn}
                lastMove={lastMove}
                gameStatus={gameStatus}
                resetGame={startGameAgainstBot}
                playerColor={playerColor}
                level={level}
                isBotThinking={isBotThinking}
                winner={winner}
                boardTheme={boardTheme}
                startGameAgainstBot={startGameAgainstBot}
                startLiveMatch={handleStartLiveMatch}
                setBoardTheme={setBoardTheme}
                isLiveGame={isLiveGame}
              />
            ) : (
              <>
                <LockedBoard onLogin={() => setShowModalAuth(true)} />
                {showModalAuth && (
                  <SignInModal
                    onClose={() => setShowModalAuth(false)}
                    onLoginSuccess={() => setShowModalAuth(false)}
                    onSwitchToRegister={() => {}}
                    onSwitchToReset={() => {}}
                  />
                )}
              </>
            )}
          </div>

          <GameHistory
            currentFen={currentFen}
            isTerminal={isTerminal}
            historyQuery={historyQuery}
            selectedGame={selectedGame}
            setSelectedGameId={setSelectedGameId}
            setPlyIndex={setPlyIndex}
            games={historyList}
            currentPly={moveHistory.length > 0 ? moveHistory.length : plyIndex}
            moveHistory={moveHistory}
          />
        </div>
      </div>
    </section>
  );
};

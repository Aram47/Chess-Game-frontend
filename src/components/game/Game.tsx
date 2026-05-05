import { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Chess } from "chess.js";

import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";
import { useGameHistory } from "../../hooks/useGameHistory";
import { getMyGameHistoryItem } from "../../api/history";
import { BOARD_THEMES, type BoardTheme } from "./board-theme/boardThemes";

import { GameColumn } from "./GameColumn";
import GameHistory from "./gameHistory";
import SignInModal from "../modal/SignInModal";
import leftIcon from "../../assets/icons/analyze/left.svg";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LockedBoardProps {
  onLogin: () => void;
}

const LockedBoard: React.FC<LockedBoardProps> = ({ onLogin }) => (
  <div className="relative w-full h-[600px] bg-[#1c1c1c] flex flex-col justify-center items-center rounded-3xl border-2 border-dashed border-[#CEB86E33]">
    <div className="max-w-[300px] text-center space-y-6">
      <p className="text-[#A39589] text-lg">
        The game is locked. Please log in to start playing.
      </p>
      <button
        onClick={onLogin}
        className="w-full bg-[#E5CC7A] text-black py-3 rounded-xl font-bold hover:scale-105 transition-transform"
      >
        Login / Register
      </button>
    </div>
  </div>
);

interface ConnectionBadgeProps {
  status: string;
}

const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({ status }) => (
  <span
    className={`text-sm ${status === "connected" ? "text-green-500" : "text-red-500"}`}
  >
    ● {status === "connected" ? "Connected" : "Connecting..."}
  </span>
);


function useHistoryReplay(
  selectedGameId: string | null,
  historyList: { _id: string; allMoves?: unknown[] }[],
  plyIndex: number,
) {
  const effectiveId = selectedGameId ?? historyList[0]?._id;

  const { data: activeGame } = useQuery({
    queryKey: ["game-detail", effectiveId],
    queryFn: () => getMyGameHistoryItem(effectiveId!),
    enabled: !!effectiveId,
  });

  const selectedGame: typeof activeGame | null = useMemo(() => {
    if (activeGame) return activeGame;
    return historyList.find((g) => g._id === effectiveId) as typeof activeGame ?? null;
  }, [activeGame, historyList, effectiveId]);

  const { currentFen, isTerminal } = useMemo(() => {
    const chess = new Chess();

    if (!selectedGame?.allMoves?.length) {
      return { currentFen: chess.fen(), isTerminal: false };
    }

    try {
      for (let i = 0; i < plyIndex; i++) {
        const move = selectedGame.allMoves[i];
        if (!move) break;
        if (!chess.move(move)) {
          console.warn(`Invalid move at index ${i}`, move);
          break;
        }
      }
    } catch (e) {
      console.error("Chess replay error:", e);
    }

    return { currentFen: chess.fen(), isTerminal: chess.isGameOver() };
  }, [selectedGame, plyIndex]);

  return { selectedGame, currentFen, isTerminal };
}

export const ChessGamePage: React.FC = () => {
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
    void startNewGame("medium", color);
  }, [startNewGame]);

  useEffect(() => {
    if (user && !isLiveGame && gameStatus === "idle") {
      startGameAgainstBot();
    }
  }, [user, isLiveGame, gameStatus, startGameAgainstBot]);

  const handleStartLiveMatch = useCallback(() => {
    if (!user) {
      setShowModalAuth(true);
      return;
    }
    findMatch();
  }, [user, findMatch]);

  return (
    <section className="w-full flex flex-col grow pt-[170px] pb-16 bg-[#1b1a17] font-barlow">
      <div className="text-white flex flex-col px-8 w-full">
        {/* Header */}
        <header className="flex items-center w-full text-center mb-8">
          <Link
            to="/"
            className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
          >
            <img src={leftIcon} alt="back" />
          </Link>

          <div className="w-full flex flex-col items-center">
            <h1 className="text-6xl text-gold font-medium tracking-tight">
              Chess Game
            </h1>
            {isLiveGame && <ConnectionBadge status={socketStatus} />}
          </div>
        </header>

        {/* Body */}
        <div className="w-full flex items-start gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {user ? (
              <GameColumn
                fen={fen}
                opponentName={isLiveGame ? "Opponent" : "Bot"}
                playerName="You"
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

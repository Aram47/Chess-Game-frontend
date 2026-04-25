import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Chess } from "chess.js";
import { getMyGameHistoryItem } from "../../api/history";

import GameHistory from "./gameHistory";
import { GameColumn } from "./GameColumn";
import SignInModal from "../modal/SignInModal";
import leftIcon from "../../assets/icons/analyze/left.svg";
import { useGameHistory } from "../../hooks/useGameHistory";
import { useGame } from "../../context/GameContext";
import { BOARD_THEMES, type BoardTheme } from "./board-theme/boardThemes";

export const ChessGamePage: React.FC = () => {
  const {
    fen,
    gameStatus,
    playerColor,
    onDrop,
    startNewGame,
    isPlayerTurn,
    isBotThinking,
    lastMove,
    moveHistory,
    winner,
    level,
  } = useGame();

  const { user } = useAuth();
  const historyQuery = useGameHistory();
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [boardTheme, setBoardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);

  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [plyIndex, setPlyIndex] = useState(0);

  const startGameAgainstBot = useCallback(() => {
    const color = Math.random() > 0.5 ? "w" : "b";
    void startNewGame(color);
  }, [startNewGame]);

  useEffect(() => {
    startGameAgainstBot();
  }, [startGameAgainstBot]);

  const historyList = useMemo(
    () => historyQuery.data?.data ?? [],
    [historyQuery.data],
  );

  const effectiveId = selectedGameId ?? historyList[0]?._id;

  const { data: activeGame } = useQuery({
    queryKey: ["game-detail", effectiveId],
    queryFn: () => getMyGameHistoryItem(effectiveId!),
    enabled: !!effectiveId,
  });

  const selectedGame = useMemo(() => {
    if (activeGame) return activeGame;

    const placeholder = historyList.find((g) => g._id === effectiveId);

    return placeholder ?? null;
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

        const result = chess.move(move);

        if (!result) {
          console.warn(`Invalid move at index ${i}`, move);
          break;
        }
      }
    } catch (e) {
      console.error("Chess error:", e);
    }

    return {
      currentFen: chess.fen(),
      isTerminal: chess.isGameOver(),
    };
  }, [selectedGame, plyIndex]);

  return (
    <section className="w-full flex flex-col grow pt-[170px] pb-16 bg-[#1b1a17] font-barlow">
      <div className="text-white flex flex-col px-8 w-full">
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

            <p className="mt-2 text-[#A39589] text-xl">
              {selectedGame
                ? `${selectedGame.white} vs ${selectedGame.black}`
                : "Select a game"}
            </p>
          </div>
        </header>

        <div className="w-full flex items-start gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {user ? (
              <GameColumn
                fen={fen}
                opponentName="Bot"
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
                setBoardTheme={setBoardTheme}
              />
            ) : (
              <div className="relative w-full h-[600px] bg-[#1c1c1c] flex flex-col justify-center items-center rounded-3xl border-2 border-dashed border-[#CEB86E33]">
                <div className="max-w-[300px] text-center space-y-6">
                  <p className="text-[#A39589] text-lg">
                    The game is locked. Please log in to start playing against
                    the bot.
                  </p>

                  <button
                    onClick={() => setShowModalAuth(true)}
                    className="w-full bg-[#E5CC7A] text-black py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                  >
                    Login / Register
                  </button>
                </div>

                {showModalAuth && (
                  <SignInModal
                    onClose={() => setShowModalAuth(false)}
                    onLoginSuccess={() => setShowModalAuth(false)}
                    onSwitchToRegister={() => {}}
                    onSwitchToReset={() => {}}
                  />
                )}
              </div>
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

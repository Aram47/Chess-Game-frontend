import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import { useAuth } from "../../../context/AuthContext";
import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { ChessColumn } from "../helpers/ChessColumn";
import { tryApplyMove } from "../../../utils/utils";
import type { MoveType } from "../../../types/gameType";
import type { BoardTheme } from "../../game/board-theme/boardThemes";
import { BOARD_THEMES } from "../../game/board-theme/boardThemes";
import { useTranslation } from "../../../hooks/useTranslation";

const LeftColumn = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { selectedGame, plyIndex, setPlyIndex } = useChessAnalysis();
  const [branchMoves, setBranchMoves] = useState<MoveType[]>([]);
  const [boardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);

  const currentFen = useMemo(() => {
    if (!selectedGame) return "";
    const chess = new Chess();

    const applyMove = (move: string | MoveType) => {
      if (typeof move === "string") {
        try {
          chess.move(move);
        } catch {
          // Ignore invalid SAN/UCI entries from history.
        }
        return;
      }
      tryApplyMove(chess, move);
    };

    for (let i = 0; i < plyIndex; i++) {
      applyMove(selectedGame.allMoves[i]);
    }
    branchMoves.forEach((m) => applyMove(m));
    return chess.fen();
  }, [selectedGame, plyIndex, branchMoves]);

  const maxPly = selectedGame?.allMoves.length || 0;

  const userId = user?.id ?? "";
  const playerName = user?.username ? `@${user.username}` : t("you_label");
  const opponentName = useMemo(() => {
    if (!selectedGame) return t("opponent");
    if (selectedGame.isBot) return t("ai_bot");
    const isWhite = String(selectedGame.white) === userId;
    const opponentId = isWhite ? selectedGame.black : selectedGame.white;
    if (opponentId === "bot") return t("ai_bot");
    return opponentId
      ? t("player_id", { id: opponentId })
      : t("opponent");
  }, [selectedGame, userId, t]);

  return (
    <div className="flex flex-col gap-4">
      <ChessColumn
        fen={currentFen}
        opponentName={opponentName}
        playerName={playerName}
        enableAnalysis
        onDrop={() => false}
        isPlayerTurn={false}
        lastMove={null}
        gameStatus={"playing"}
        resetGame={() => undefined}
        playerColor={"w"}
        isBotThinking={false}
        winner={null}
        boardTheme={boardTheme}
        analyzeControls={{
          goBack: () =>
            branchMoves.length > 0
              ? setBranchMoves((b) => b.slice(0, -1))
              : setPlyIndex((p) => Math.max(0, p - 1)),
          goForward: () => plyIndex < maxPly && setPlyIndex((p) => p + 1),
          goFirst: () => {
            setBranchMoves([]);
            setPlyIndex(0);
          },
          goLast: () => {
            setBranchMoves([]);
            setPlyIndex(maxPly);
          },
        }}
      />
    </div>
  );
};

export default LeftColumn;

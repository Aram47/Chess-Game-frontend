// components/analyze/LeftColumn.tsx
import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { ChessColumn } from "../helpers/ChessColumn";
// import { GameColumn } from "../game/gameColumn";
import { tryApplyMove } from "../../../utils/utils";
import type { MoveType } from "../../../types/gameType";
import type { BoardTheme } from "../../game/board-theme/boardThemes";
import { BOARD_THEMES } from "../../game/board-theme/boardThemes";

const LeftColumn = () => {
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

  return (
    <div className="flex flex-col gap-4">
      <ChessColumn
        fen={currentFen}
        opponentName={selectedGame?.isBot ? "Engine" : "Opponent"}
        playerName="Me"
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

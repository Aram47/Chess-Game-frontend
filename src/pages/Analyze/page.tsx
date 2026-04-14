import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Chess } from "chess.js";
import { getMyGameHistory, type GameHistoryItem } from "../../api/history";
import { GameColumn } from "./chess";
import AnalyzeColumn from "../../components/analyze/analyze";
import AnalyzeButtons from "../../components/analyze/AnalyzeButtons";
import { tryApplyMove } from "../../utils/utils";
import { analyzePosition } from "../../api/analysis";
import type { MoveType } from "../../types/gameType";

import leftIcon from "../../assets/icons/analyze/left.svg";


export const ChessAnalysisUI: React.FC = () => {
  const [games] = useState<GameHistoryItem[]>([]);

  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [plyIndex, setPlyIndex] = useState(0);
  const [branchMoves, setBranchMoves] = useState<MoveType[]>([]);

  const [analysisDepth] = useState(12);
  const [analysisLines] = useState(3);

  const historyQuery = useQuery({
    queryKey: ["game-history"],
    queryFn: () => getMyGameHistory(1, 50),
  });

  const selectedGame = useMemo(() => {
    return games.find((g) => g._id === selectedGameId) ?? games[0] ?? null;
  }, [games, selectedGameId]);

  //   const maxPly = useMemo(() => selectedGame?.allMoves.length ?? 0, [selectedGame]);

  const { currentFen, isTerminal } = useMemo(() => {
    const chess = new Chess();
    const sans: string[] = [];
    if (!selectedGame) return { currentFen: undefined, isTerminal: true };

    for (let i = 0; i < plyIndex; i++) {
      tryApplyMove(chess, selectedGame.allMoves[i]);
    }
    for (const move of branchMoves) {
      const result = chess.move(move);
      if (result) sans.push(result.san);
    }
    return {
      currentFen: chess.fen(),
      isTerminal: chess.isGameOver(),
    };
  }, [selectedGame, plyIndex, branchMoves]);

  const analysisEnabled = Boolean(currentFen && selectedGame && !isTerminal);

  //   const handleDrop = (source: string, target: string) => {
  //     setBranchMoves([
  //       ...branchMoves,
  //       { from: source, to: target, promotion: "q" },
  //     ]);
  //     return true;
  //   };

  //   function truncatePv(tokens: string[], max = 6): string {
  //     if (tokens.length <= max) return tokens.join(" ");
  //     return `${tokens.slice(0, max).join(" ")} …`;
  //   }

  //   function moveToSan(fen: string, move: MoveType): string {
  //     try {
  //       const c = new Chess(fen);
  //       const m = c.move(move);
  //       return m ? m.san : `${move.from}-${move.to}`;
  //     } catch {
  //       return `${move.from}-${move.to}`;
  //     }
  //   }

  //   const renderLineRow = (line: AnalysisLine) => {
  //     const san = currentFen
  //       ? moveToSan(currentFen, line.move)
  //       : `${line.move.from}-${line.move.to}`;
  //     return (
  //       <div
  //         key={line.rank}
  //         className="rounded border border-border/60 bg-muted/30 px-2 py-1.5 text-xs space-y-0.5"
  //       >
  //         <div className="flex items-center justify-between gap-1">
  //           <span className="font-medium truncate">
  //             #{line.rank} {san}
  //             {line.move.promotion ? ` (${line.move.promotion})` : ""}
  //           </span>
  //           <span className="tabular-nums text-muted-foreground shrink-0">
  //             {formatEngineEvaluation(line.evaluation)}
  //           </span>
  //         </div>
  //         <p className="text-[10px] leading-tight text-muted-foreground font-mono break-all line-clamp-2">
  //           {truncatePv(line.pvUci)}
  //         </p>
  //       </div>
  //     );
  //   };

  const analysisQuery = useQuery({
    queryKey: ["position-analyze", currentFen, analysisDepth, analysisLines],
    queryFn: () =>
      analyzePosition({
        fen: currentFen!,
        depth: analysisDepth,
        recommendedMovesCount: analysisLines,
      }),
    enabled: analysisEnabled,
    staleTime: 30_000,
  });

  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    const best = analysisQuery.data?.bestMove;
    if (best) {
      styles[best.from] = { backgroundColor: "rgba(250, 204, 21, 0.45)" };
      styles[best.to] = { backgroundColor: "rgba(34, 197, 94, 0.4)" };
    }
    if (branchMoves.length > 0) {
      const last = branchMoves[branchMoves.length - 1];
      styles[last.from] = {
        ...styles[last.from],
        boxShadow: "inset 0 0 0 2px #E5CC7A",
      };
      styles[last.to] = {
        ...styles[last.to],
        boxShadow: "inset 0 0 0 2px #E5CC7A",
      };
    }
    return styles;
  }, [analysisQuery.data?.bestMove, branchMoves]);

  //   const maxPly = selectedGame?.allMoves.length ?? 0;
  const maxPly = 40;

  const goBack = () =>
    branchMoves.length > 0
      ? setBranchMoves((b) => b.slice(0, -1))
      : setPlyIndex((p) => Math.max(0, p - 1));
  const goForward = () =>
    branchMoves.length === 0 && plyIndex < maxPly && setPlyIndex((p) => p + 1);
  const goFirst = () => {
    setBranchMoves([]);
    setPlyIndex(0);
  };
  const goLast = () => {
    setBranchMoves([]);
    setPlyIndex(maxPly);
  };

  return (
    <section className="w-full flex flex-col grow pt-[170px] pb-16 bg-[#1b1a17]">
      <div className="text-white font-sans flex flex-col px-8 w-full">
        <header className="w-full text-center mb-8">
          <h1 className="text-6xl text-gold font-playfair font-black tracking-tight">
            Game Analysis
          </h1>
        </header>

        <Link
          to="/"
          className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl mb-8"
        >
          <img src={leftIcon} alt="back" />
        </Link>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
          <div className="flex flex-col gap-4">
            <GameColumn
              fen={currentFen}
              onMove={(move) => setBranchMoves([...branchMoves, move])}
              opponentName={selectedGame?.black}
              playerName={selectedGame?.white}
              gameStatus={
                selectedGame?.winnerColor === "draw" ? "Draw" : "Finished"
              }
              squareStyles={squareStyles}
              plyIndex={plyIndex}
              maxPly={maxPly}
            />

            <AnalyzeButtons
              goBack={goBack}
              goForward={goForward}
              goFirst={goFirst}
              goLast={goLast}
            />
          </div>

          <AnalyzeColumn
            currentFen={currentFen}
            isTerminal={isTerminal}
            analysisQuery={analysisQuery}
            historyQuery={historyQuery}
            // analysisDepth={analysisDepth}
            // setAnalysisDepth={setAnalysisDepth}
            // analysisLines={analysisLines}
            // setAnalysisLines={setAnalysisLines}
            // renderLineRow={renderLineRow}
            selectedGame={selectedGame}
            games={games}
            // isHistoryLoading={historyQuery.isLoading}
            setSelectedGameId={setSelectedGameId}
            setPlyIndex={setPlyIndex}
          />
        </div>
      </div>
    </section>
  );
};

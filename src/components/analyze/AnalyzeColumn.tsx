import { useQuery } from "@tanstack/react-query";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";
import { analyzePosition } from "../../api/analysis";
import { formatEngineEvaluation } from "../../lib/analysis/format-engine-eval";
import { Bot, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { Chess } from "chess.js";
import { tryApplyMove } from "../../utils/utils";

const AnalyzeColumn = () => {
  const { selectedGame, plyIndex, setSelectedGameId, games } =
    useChessAnalysis();

  const currentFen = useMemo(() => {
    if (!selectedGame) return null;
    const chess = new Chess();
    for (let i = 0; i < plyIndex; i++) {
      tryApplyMove(chess, selectedGame.allMoves[i]);
    }
    return chess.fen();
  }, [selectedGame, plyIndex]);

  const analysisQuery = useQuery({
    queryKey: ["position-analyze", currentFen],
    queryFn: () =>
      analyzePosition({
        fen: currentFen!,
        depth: 12,
        recommendedMovesCount: 3,
      }),
    enabled: !!currentFen,
  });

  const getMoveAssessment = (evalObj: { kind: string; value: number }) => {
    if (evalObj.kind === "mate")
      return { label: "Winning", color: "text-green-400" };
    const score = evalObj.value / 100;
    if (score > 1.5) return { label: "Excellent", color: "text-green-400" };
    if (score < -1.5) return { label: "Blunder", color: "text-red-400" };
    return { label: "Solid", color: "text-gold" };
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Engine Results */}
      <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-6">
        <h2 className="text-[#FCFAF2] font-normal text-xl mb-4 text-xs tracking-widest">
          All Moves
        </h2>

        {analysisQuery.isLoading ? (
          <div className="flex flex-col items-center py-10">
            <Loader2 className="animate-spin text-gold" />
          </div>
        ) : (
          <div className="space-y-3">
            {analysisQuery.data?.lines.map((line, i) => {
              const assessment = getMoveAssessment(line.evaluation);
              return (
                <div
                  key={i}
                  className="bg-white/5 p-3 rounded-lg border border-white/10"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-[10px] font-bold ${assessment.color}`}
                    >
                      {assessment.label}
                    </span>
                    <span className="font-mono text-gold">
                      {formatEngineEvaluation(line.evaluation)}
                    </span>
                  </div>
                  <div className="text-gray-400 font-mono text-xs">
                    {line.pvUci?.slice(0, 3).join(" ")} ...
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History Selection */}
      <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-8">
        <div className="flex justify-between">
          <h2 className="text-gold mb-4 text-xs font-bold">Game History</h2>
          <p className="text-[#A39589] font-normal">{games.length} games</p>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mt-4">
          {games.map((game) => (
            <button
              key={game._id}
              onClick={() => setSelectedGameId(game._id)}
              className={`w-full text-left bg-[#1C1C1C4D] py-2.5 px-3 rounded-[10px] transition-all ${
                selectedGame?._id === game._id
                  ? "bg-[#1C1C1C4D]"
                  : "border-white/5 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-x-3">
                {game.isBot && (
                  <div className="rounded-full bg-[#E5CC7A14] py-2 px-3 flex justify-center items-center">
                    <Bot size={24} className="text-gold" />
                  </div>
                )}

                <div className="flex flex-col gap-y-1">
                  <span className="text-sm font-normal text-[#F7F7F7]">
                    {game.isBot ? "Bot Name" : "vs Player"}
                  </span>
                  <p className="text-xs text-[#676767]">
                    {new Date(game.finishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeColumn;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import bestIcon from "../../assets/icons/analyze/best.svg";
import { analyzePosition } from "../../api/analysis";
import { formatEngineEvaluation } from "../../lib/format-engine-eval";

interface AnalyzeColumnProps {
  currentFen: string | undefined;
  isTerminal: boolean;
  selectedGameId: string | undefined;
}

const AnalyzeColumn: React.FC<AnalyzeColumnProps> = ({
  currentFen,
  isTerminal,
  selectedGameId,
}) => {
  const [analysisDepth] = useState(12);
  const [analysisLines] = useState(3);

  const analysisEnabled = !!(currentFen && selectedGameId && !isTerminal);

  const analysisQuery = useQuery({
    queryKey: ["position-analyze", currentFen, analysisDepth, analysisLines],
    queryFn: () =>
      analyzePosition({
        fen: currentFen!,
        recommendedMovesCount: analysisLines,
        depth: analysisDepth,
      }),
    enabled: analysisEnabled,
    staleTime: 30_000,
  });

  const bestLine = analysisQuery.data?.lines?.[0];

  return (
    <div className="w-full md:w-72 flex flex-col gap-4">
      {/* Eval Bar */}
      <div className="bg-[#262626] rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Eval
          </span>
          <span className="text-[#4ade80] font-bold text-lg">
            {bestLine?.evaluation
              ? formatEngineEvaluation(bestLine.evaluation)
              : "0.00"}{" "}
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] transition-all duration-500"
            style={{
              width: `${(() => {
                if (!bestLine?.evaluation) return 50;
                const { kind, value } = bestLine.evaluation;

                if (kind === "mate") return value > 0 ? 100 : 0;

                const evalInPawns = value / 100;
                return Math.min(Math.max(50 + evalInPawns * 10, 5), 95);
              })()}%`,
            }}
          />
        </div>
      </div>

      {/* Best Move */}
      <div className="bg-[#262626] border border-[#D4AF37]/20 rounded-xl p-5 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#4ade80] mb-2">
          <img src={bestIcon} className="w-4 h-4" alt="Best" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Best Move
          </span>
        </div>
        <p className="text-xs text-mute">Gains material advantage.</p>
      </div>

      {/* Lines List */}
      <div className="bg-[#262626] rounded-xl p-4 flex-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">
          Lines
        </span>
        <div className="space-y-2 overflow-y-auto pr-1 flex-1 custom-scrollbar">
          {analysisQuery.isPending && analysisEnabled ? (
            <div className="flex items-center gap-2 text-gray-500 text-xs py-4">
              <Loader2 className="animate-spin h-3 w-3" /> Analyzing...
            </div>
          ) : (
            analysisQuery.data?.lines.map((line: any, i: number) => (
              <div key={i} className="flex justify-between text-sm font-medium">
                <span className="font-mono text-gray-300">
                  {line.pv.split(" ").slice(0, 3).join(" ")}...
                </span>
                <span className="text-[#4ade80] font-bold">
                  {line.evaluation}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeColumn;

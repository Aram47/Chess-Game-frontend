import React from "react";
import { formatEngineEvaluation } from "../../lib/format-engine-eval";
import { type UseQueryResult } from "@tanstack/react-query";
import type { AnalyzePositionResult } from "../../types/analyzeTypes";

import type { GameHistoryItem } from "../../api/history";
import { Bot, Loader2 } from "lucide-react";

interface AnalyzeColumnProps {
  currentFen: string | undefined;
  isTerminal: boolean;
  analysisQuery: UseQueryResult<AnalyzePositionResult, Error>;
  historyQuery: UseQueryResult<any, Error>;
  //   analysisDepth: number;
  //   setAnalysisDepth: (depth: number) => void;
  //   analysisLines: number;
  //   setAnalysisLines: (lines: number) => void;
  //   renderLineRow: (line: AnalysisLine) => React.ReactNode;
  selectedGame: GameHistoryItem | null;
  games: GameHistoryItem[];
  //   isHistoryLoading: boolean;
  setSelectedGameId: (id: string) => void;
  setPlyIndex: (index: number) => void;
}

const AnalyzeColumn: React.FC<AnalyzeColumnProps> = ({
  isTerminal,
  analysisQuery,
  //   analysisDepth,
  //   setAnalysisDepth,
  //   analysisLines,
  //   setAnalysisLines,
  //   renderLineRow,
  selectedGame,
  games,
  historyQuery,
  //   isHistoryLoading,
  setSelectedGameId,
  setPlyIndex,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 font-barlow">
      {/* Engine Analysis Results */}
      <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-6 min-h-[300px]">
        <h2 className="text-sm text-gray-400 mb-6 tracking-wider font-semibold">
          All Moves
        </h2>

        {analysisQuery.isLoading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500 text-xs italic">Thinking...</span>
          </div>
        )}

        {analysisQuery.isError && (
          <div className="text-red-400 text-xs bg-red-400/10 p-3 rounded border border-red-400/20">
            {analysisQuery.error.message}
          </div>
        )}

        {analysisQuery.isSuccess && analysisQuery.data && !isTerminal && (
          <div className="space-y-4">
            {/* Top Evaluation Score */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-gray-500">Evaluation</span>
              <div className="bg-[#1c1c1c] px-4 py-1.5 rounded text-gold font-mono text-lg font-bold border border-gold/20">
                {formatEngineEvaluation(
                  analysisQuery.data.lines[0]?.evaluation,
                )}
              </div>
            </div>

            <div className="space-y-3">
              {analysisQuery.data.lines.map((line, i) => (
                <div
                  key={i}
                  className="text-xs bg-[#FFFFFF05] p-3 rounded-lg border border-white/5 hover:border-gold/30 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gold/80 font-medium">
                      Line {i + 1}
                    </span>
                    <span className="text-gray-400 font-mono">
                      {formatEngineEvaluation(line.evaluation)}
                    </span>
                  </div>
                  <div className="text-gray-300 font-mono leading-relaxed bg-black/20 p-2 rounded">
                    {line.pvUci?.slice(0, 4).join(" ")} ...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {isTerminal && (
          <div className="flex items-center justify-center py-10">
            <span className="text-gray-500 text-sm italic">
              Game Over — No analysis available
            </span>
          </div>
        )} */}
      </div>

      {/* */}

      <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-6 min-h-[300px]">
        <h2>Game History</h2>

        {historyQuery.isPending ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : historyQuery.isError ? (
          <div>
            <p>Failed to load game history. Please try again.</p>
          </div>
        ) : games.length === 0 ? (
          <div>
            <p className="py-12 text-center text-muted-foreground text-sm">
              No finished games yet. Play a game with bot or real player to see
              analysis here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col shadow-sm max-h-[42vh] lg:max-h-none lg:h-full lg:min-h-0">
            <div className="py-2 px-3 space-y-0 shrink-0">
              <h3 className="text-sm">Games</h3>
              <p className="text-xs">
                {historyQuery.data?.meta.total ?? games.length} total
              </p>
            </div>
            <div className="px-2 pb-2 pt-0 flex-1 min-h-0 overflow-y-auto space-y-1.5">
              {games.map((game) => {
                const isSelected = game._id === selectedGame?._id;
                return (
                  <button
                    key={game._id}
                    type="button"
                    className={`w-full text-left rounded-md border px-2 py-1.5 transition-colors text-xs ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => {
                      setSelectedGameId(game._id);
                      setPlyIndex(0);
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-medium truncate">
                        {game.isBot ? "Vs Bot" : "Vs Player"}
                      </span>
                      {game.isBot && (
                        <Bot className="h-3 w-3 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      {new Date(game.finishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {game.winnerColor === "draw"
                        ? "Draw"
                        : `W: ${game.winnerColor}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* <div>{analysisPanel}</div> */}
    </div>
  );
};

export default AnalyzeColumn;

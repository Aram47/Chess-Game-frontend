import { useChessAnalysis } from "../../../context/ChessAnalysisContext";
import { Bot } from "lucide-react";
import { useMemo, useEffect, useRef } from "react";
import type { MoveType } from "../../../types/gameType";
import AllPlayedGames from "../AllPlayedGames";

const formatMove = (move: string | MoveType): string => {
  if (typeof move === "string") return move;
  return `${move.from}${move.to}${move.promotion ?? ""}`;
};

const AnalyzeColumn = ({
  winner,
}: {
  winner: "you" | "bot" | "draw" | null;
}) => {
  const { selectedGame, plyIndex, setPlyIndex, setSelectedGameId, games } =
    useChessAnalysis();

  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [plyIndex]);

  const movePairs = useMemo(() => {
    if (!selectedGame) return [];
    const moves = selectedGame.allMoves;
    const pairs: {
      white: string;
      black?: string;
      whitePly: number;
      blackPly: number;
    }[] = [];
    for (let i = 0; i < moves.length; i += 2) {
      pairs.push({
        white: formatMove(moves[i]),
        black: moves[i + 1] ? formatMove(moves[i + 1]) : undefined,
        whitePly: i + 1,
        blackPly: i + 2,
      });
    }
    return pairs;
  }, [selectedGame]);

  const winnerPlayer = winner ? "Win" : "Loss";

  return (
    <div className="flex flex-col gap-6">
      {/* All Moves */}
      <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-6">
        <h2 className="text-[#FCFAF2] mb-4 text-xs tracking-widest uppercase">
          All Moves
        </h2>

        {!selectedGame ? (
          <p className="text-[#676767] text-xs text-center py-6">
            Select a game to see its moves
          </p>
        ) : movePairs.length === 0 ? (
          <p className="text-[#676767] text-xs text-center py-6">
            No moves recorded
          </p>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-1 space-y-1">
            {movePairs.map((pair, i) => (
              <div
                key={i}
                className="grid grid-cols-[28px_1fr_1fr] items-center gap-1"
              >
                {/* Move number */}
                <span className="text-[#676767] text-xs text-right pr-1">
                  {i + 1}.
                </span>

                {/* White move */}
                <button
                  ref={plyIndex === pair.whitePly ? activeRef : null}
                  onClick={() => setPlyIndex(pair.whitePly)}
                  className={`text-left text-xs font-mono px-3 py-1.5 rounded-md transition-all ${
                    plyIndex === pair.whitePly
                      ? "bg-[#E5CC7A] text-[#1C1C1C] font-bold"
                      : "bg-white/5 text-[#F7F7F7] hover:bg-white/10"
                  }`}
                >
                  {pair.white}
                </button>

                {/* Black move */}
                {pair.black ? (
                  <button
                    ref={plyIndex === pair.blackPly ? activeRef : null}
                    onClick={() => setPlyIndex(pair.blackPly)}
                    className={`text-left text-xs font-mono px-3 py-1.5 rounded-md transition-all ${
                      plyIndex === pair.blackPly
                        ? "bg-[#E5CC7A] text-[#1C1C1C] font-bold"
                        : "bg-white/5 text-[#F7F7F7] hover:bg-white/10"
                    }`}
                  >
                    {pair.black}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History Selection */}
      {!selectedGame ? (
        <AllPlayedGames games={games} />
      ) : (
        <div className="bg-[#262421] border border-[#CEB86E33] rounded-xl p-8">
          <div className="flex justify-between">
            <h2 className="text-gold mb-4 text-xs font-bold">Game History</h2>
            <p className="text-[#A39589] font-normal">{games.length} games</p>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto mt-4">
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
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-3">
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

                  <div className="flex items-center gap-x-3">
                    <span className="text-xs text-[#AD1414] bg-[#EF66661A] py-1.5 px-3 rounded-[8px]">
                      {winnerPlayer}
                    </span>
                    <span className="text-sm text-[#787878] font-normal">
                      {game.allMoves.length} moves
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeColumn;
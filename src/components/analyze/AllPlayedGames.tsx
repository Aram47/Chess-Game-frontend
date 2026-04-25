import { useSearchParams } from "react-router-dom";
import type { GameHistoryItem } from "../../types/gameType";
import { AnalyzeIcon } from "./helpers/AnalyzeIcon";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";

interface AllPlayedGamesProps {
  games: GameHistoryItem[];
}

const AllPlayed = ({ games }: AllPlayedGamesProps) => {
  const [, setSearchParams] = useSearchParams();

  const { setSelectedGameId } = useChessAnalysis();

  const getOpponentName = (game: GameHistoryItem) =>
    game.isBot ? "Stockfish" : game.black || game.white || "Unknown";

  const getResultLabel = (game: GameHistoryItem) => {
    if (game.winnerColor === "draw") return "draw";
    return game.winnerColor === "white" ? "win" : "loss";
  };

  const handleGameSelect = (id: string) => {
    setSelectedGameId(id);
    setSearchParams({ gameId: id });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-2">
      {games.map((game, i) => (
        <div
          key={i}
          onClick={() => handleGameSelect(game._id)}
          className="w-full bg-[#1C1C1C4D] py-2.5 px-3 rounded-xl flex items-center justify-between mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E5CC7A] flex items-center justify-center text-[#1c1c1c] font-bold">
              {getOpponentName(game).charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-normal text-[#F7F7F7]">
                {getOpponentName(game)}
              </p>
              <p className="text-xs font-normal text-[#676767]">
                {game.isBot ? "Bot Game" : "Player Game"} •{" "}
                {new Date(game.finishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div>
              <span
                className={`text-[10px] px-2 py-1 rounded capitalize font-medium ${
                  getResultLabel(game) === "win"
                    ? "bg-[#7FC4741A] text-[#307D24]"
                    : getResultLabel(game) === "loss"
                      ? "bg-[#EF66661A] text-[#AD1414]"
                      : "bg-[#6767671A] text-[#787878]"
                }`}
              >
                {getResultLabel(game)}
              </span>
              <div className="text-right">
                <p className="text-sm text-[#787878]">
                  {game.allMoves.length} moves
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AllPlayedGames = ({ games }: AllPlayedGamesProps) => {
  return (
    <section className="w-full h-full flex flex-col grow bg-[#1b1a17] font-barlow">
      <div className="bg-[#262421] border border-[#CEB86E33] flex flex-col rounded-[20px] p-8 min-h-[670px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#E5CC7A] font-normal text-xl">Game History</h2>
          <span className="text-[#A39589]">{games.length} games</span>
        </div>
        {!games ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-2">
            <AnalyzeIcon games={games} />
            <p className="text-[#EEDDA6] font-medium text-xl">
              No Game Selected
            </p>
            <p className="text-[#A39589] text-md font-normal">
              Select a game from the history to analyze its moves
            </p>
          </div>
        ) : (
          <AllPlayed games={games} />
        )}
      </div>
    </section>
  );
};

export default AllPlayedGames;

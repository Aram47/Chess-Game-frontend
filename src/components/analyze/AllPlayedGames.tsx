import { useSearchParams } from "react-router-dom";
import type { GameHistoryItem } from "../../types/gameType";
import { useTranslation } from "../../hooks/useTranslation";
import { AnalyzeIcon } from "./helpers/AnalyzeIcon";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";

interface AllPlayedGamesProps {
  games: GameHistoryItem[];
}

const AllPlayed = ({ games }: AllPlayedGamesProps) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const { setSelectedGameId } = useChessAnalysis();

  const getOpponentName = (game: GameHistoryItem) =>
    game.isBot ? t("stockfish") : game.black || game.white || t("unknown");

  const getResultKey = (game: GameHistoryItem): "draw_label" | "win" | "loss" => {
    if (game.winnerColor === "draw") return "draw_label";
    return game.winnerColor === "white" ? "win" : "loss";
  };

  const handleGameSelect = (id: string) => {
    setSelectedGameId(id);
    setSearchParams({ gameId: id });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-2">
      {games.map((game, i) => {
        const resultKey = getResultKey(game);
        return (
          <div
            key={i}
            onClick={() => handleGameSelect(game._id)}
            className="w-full bg-[#1C1C1C4D] py-2.5 px-3 rounded-xl flex items-center justify-between mt-4 cursor-pointer"
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
                  {game.isBot ? t("bot_game") : t("player_game")} •{" "}
                  {new Date(game.finishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <div>
                <span
                  className={`text-[10px] px-2 py-1 rounded capitalize font-medium ${
                    resultKey === "win"
                      ? "bg-[#7FC4741A] text-[#307D24]"
                      : resultKey === "loss"
                        ? "bg-[#EF66661A] text-[#AD1414]"
                        : "bg-[#6767671A] text-[#787878]"
                  }`}
                >
                  {t(resultKey)}
                </span>
                <div className="text-right">
                  <p className="text-sm text-[#787878]">
                    {t("moves_count", { count: game.allMoves.length })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AllPlayedGames = ({ games }: AllPlayedGamesProps) => {
  const { t } = useTranslation();

  return (
    <section className="w-full h-full flex flex-col grow bg-[#1b1a17] font-barlow">
      <div className="bg-[#262421] border border-[#CEB86E33] flex flex-col rounded-[20px] p-8 min-h-[670px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#E5CC7A] font-normal text-xl">{t("game_history")}</h2>
          <span className="text-[#A39589]">
            {t("games_count", { count: games.length })}
          </span>
        </div>
        {!games ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-2">
            <AnalyzeIcon games={games} />
            <p className="text-[#EEDDA6] font-medium text-xl">
              {t("no_game_selected")}
            </p>
            <p className="text-[#A39589] text-md font-normal">
              {t("select_game_history")}
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

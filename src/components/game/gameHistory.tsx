import type { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import type { GameHistoryItem, MoveType } from "../../types/gameType";
import { normalizeMove } from "../../lib/chess/formatMove";
import { MoveHistoryEntry } from "./MoveHistoryEntry";

interface Props {
  currentFen: string | undefined;
  isTerminal: boolean;
  historyQuery: UseQueryResult<unknown, Error>;
  selectedGame: GameHistoryItem | null;
  games: GameHistoryItem[];
  setSelectedGameId: (id: string) => void;
  setPlyIndex: (index: number) => void;
  currentPly: number;
  moveHistory?: MoveType[];
}

const GameHistory = ({
  historyQuery,
  selectedGame,
  setPlyIndex,
  currentFen,
  currentPly,
  moveHistory = [],
}: Props) => {
  const { t } = useTranslation();
  const isLoadingDetail = !selectedGame?.allMoves && selectedGame?._id;
  const displayedMoves = moveHistory;

  const turnCode = currentFen?.split(" ")[1];
  const currentTurnColor =
    turnCode === "w" ? t("white") : t("black");

  return (
    <div className="w-[35%] bg-[#262421] border border-[#CEB86E33] rounded-[20px] p-6 flex flex-col text-white font-barlow">
      <h2 className="text-xl font-medium mb-4 text-[#E5CC7A]">
        {t("move_history")}
      </h2>

      {historyQuery.isPending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#CEB86E]" />
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden h-full">
          <div className="overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
            {isLoadingDetail ? (
              <div className="py-10 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mb-2" />
                <p className="text-xs">{t("fetching_moves")}</p>
              </div>
            ) : displayedMoves.length > 0 ? (
              <div className="flex flex-col gap-y-1">
                {displayedMoves.map((move, index) => {
                  const normalized = normalizeMove(move);
                  if (!normalized) return null;

                  return (
                    <MoveHistoryEntry
                      key={index}
                      plyIndex={index}
                      from={normalized.from}
                      to={normalized.to}
                      onSelect={setPlyIndex}
                      isActive={currentPly === index + 1}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-[#A39589]">
                <p className="text-xs italic">{t("no_moves_yet")}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full mt-auto">
        <div className="w-full flex flex-col gap-y-3 mt-6 border-t border-[#CEB86E33] pb-4">
          <div className="text-sm flex items-center justify-between mt-6">
            <span className="text-[#A39589]">{t("total_moves")}</span>
            <span className="text-[#E5CC7A]">{displayedMoves.length}</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-[#A39589]">{t("current_turn")}</span>
            <span
              className={`font-medium ${turnCode === "w" ? "text-[#E5CC7A]" : "text-gray-400"}`}
            >
              {currentTurnColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHistory;

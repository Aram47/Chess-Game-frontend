// import { Loader2 } from "lucide-react";
// import FirstStep from "../steps/firstStep";
// import SecondStep from "../steps/secStep";
// import type { UseQueryResult } from "@tanstack/react-query";
// // import { useState, useEffect } from "react";
// // import { problemsApi } from "../../../api/problems";
// import type { GameHistoryItem, MoveType } from "../../../types/gameType";
// // import type { ChessProblem } from "../../../types/problems";

// interface Props {
//   currentFen: string | undefined;
//   historyQuery: UseQueryResult<unknown, Error>;
//   selectedGame: GameHistoryItem | null;
//   games: GameHistoryItem[];
//   setSelectedGameId: (id: string) => void;
//   setPlyIndex: (index: number) => void;
//   moveHistory?: MoveType[];
// }

// const SolveHistory = ({
//   historyQuery,
//   selectedGame,
//   setPlyIndex,
//   currentFen,
//   moveHistory = [],
// }: Props) => {
//   const isLoadingDetail = !selectedGame?.allMoves && selectedGame?._id;
// //   const [problemDetail, setProblemDetail] = useState<ChessProblem | null>(null);

// //   useEffect(() => {
// //     if (selectedGame?.id) {
// //       problemsApi.getProblemById(selectedGame.id).then((data) => {
// //         setProblemDetail(data);
// //       });
// //     }
// //   }, [selectedGame?.id]);

//   const turnCode = currentFen?.split(" ")[1];

//   const currentTurnColor = turnCode === "w" ? "White" : "Black";

//   return (
//     <div className="w-[35%] bg-[#262421] border border-[#CEB86E33] rounded-[20px] p-6 flex flex-col text-white ">
//       <h2 className="text-xl font-medium mb-4 text-[#E5CC7A]">Move History</h2>

//       {historyQuery.isPending ? (
//         <div className="flex items-center justify-center">
//           <Loader2 className="h-8 w-8 animate-spin text-[#CEB86E]" />
//         </div>
//       ) : (
//         <div className="flex flex-col overflow-hidden">
//           <div className="overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
//             {isLoadingDetail ? (
//               <div className="py-10 flex flex-col items-center justify-center text-gray-500">
//                 <Loader2 className="h-5 w-5 animate-spin mb-2" />
//                 <p className="text-xs">Fetching moves...</p>
//               </div>
//             ) : moveHistory.length > 0 ? (
//               <div className="flex flex-col gap-y-1">
//                 {moveHistory.map((move, index) => {
//                   const isWhite = index % 2 === 0;

//                   return (
//                     <div key={index} className="flex flex-col gap-y-2">
//                       {isWhite ? (
//                         <FirstStep
//                           setPlyIndex={setPlyIndex}
//                           index={index}
//                           from={move.from}
//                           isWhite={true}
//                         />
//                       ) : (
//                         <SecondStep index={index} to={move.to} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="py-8 flex flex-col items-center justify-center text-[#A39589]">
//                 <p className="text-xs italic">{t("no_moves_yet")}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer Info */}
//       <div className="w-full">
//         <div className="w-full flex flex-col gap-y-3 mt-6 border-t border-[#CEB86E33] pb-4">
//           <div className="text-sm flex items-center justify-between mt-6">
//             <span className="text-[#A39589]">Total Moves:</span>
//             <span className="text-[#E5CC7A]">{moveHistory.length}</span>
//           </div>
//           <div className="flex items-center justify-between gap-2 text-sm">
//             <span className="text-[#A39589]">Current Turn:</span>
//             <span
//               className={`font-medium ${turnCode === "w" ? "text-[#E5CC7A]" : "text-gray-400"}`}
//             >
//               {currentTurnColor}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SolveHistory;

import { Loader2 } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MoveType } from "../../../types/gameType";
import { normalizeMove } from "../../../lib/chess/formatMove";
import { MoveHistoryEntry } from "../../game/MoveHistoryEntry";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTheme } from "../../../context/ThemeContext";

interface Props {
  currentFen: string | undefined;
  historyQuery: UseQueryResult<unknown, Error>;
  setPlyIndex: (index: number) => void;
  moveHistory?: MoveType[];
}

const SolveHistory = ({
  historyQuery,
  setPlyIndex,
  currentFen,
  moveHistory = [],
}: Props) => {
  const { t } = useTranslation();
  const turnCode = currentFen?.split(" ")[1];
  const { theme } = useTheme();
  const currentTurnColor = turnCode === "w" ? t("white") : t("black");

  return (
    <div
      className={`w-[35%] border border-[#CEB86E33] rounded-[20px] p-6 flex flex-col text-white ${theme === "dark" ? "bg-[#262421]" : "bg-white"}`}
    >
      <h2 className="text-xl font-medium mb-4 text-[#E5CC7A]">
        {t("move_history")}
      </h2>

      {historyQuery.isPending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#CEB86E]" />
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden">
          <div className="overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
            {moveHistory.length > 0 ? (
              <div className="flex flex-col gap-y-1">
                {moveHistory.map((move, index) => {
                  const normalized = normalizeMove(move);
                  if (!normalized) return null;

                  return (
                    <MoveHistoryEntry
                      key={index}
                      plyIndex={index}
                      from={normalized.from}
                      to={normalized.to}
                      onSelect={setPlyIndex}
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

      {/* Footer Info */}
      <div className="w-full">
        <div className="w-full flex flex-col gap-y-3 mt-6 border-t border-[#CEB86E33] pb-4">
          <div className="text-sm flex items-center justify-between mt-6">
            <span className="text-[#A39589]">{t("total_moves")}</span>
            <span className="text-[#E5CC7A]">{moveHistory.length}</span>
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

export default SolveHistory;

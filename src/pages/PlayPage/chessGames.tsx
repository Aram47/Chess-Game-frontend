// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getMyGameHistory, type GameHistoryItem } from "../../api/history";
// import type { MoveType } from "../../types/gameType";
// import { GameColumn, computePosition } from "./chess";
// import AnalyzeColumn from "./analyze";
// import AnalyzeButtons from "./AnalyzeButtons";

// import leftArrow from "../../assets/icons/analyze/leftArrow.svg";
// import rightArrow from "../../assets/icons/analyze/rightArrow.svg";

// type BoardOrientation = "white" | "black";

// export const ChessAnalysisUI: React.FC = () => {
//   const [selectedGameId] = useState<string | null>(null);
//   const [plyIndex, setPlyIndex] = useState(0);
//   const [branchMoves, setBranchMoves] = useState<MoveType[]>([]);
//   const [orientation, setOrientation] = useState<BoardOrientation>("white");
//   const [counter] = useState(0);

//   const { data } = useQuery({
//     queryKey: ["game-history"],
//     queryFn: () => getMyGameHistory(1, 50),
//   });

//   const games = data?.data ?? [];
//   const selectedGame: GameHistoryItem | null =
//     games.find((g) => g._id === selectedGameId) ?? games[0] ?? null;
//   const maxPly = selectedGame?.allMoves.length ?? 0;

//   const { currentFen, isTerminal } = computePosition(
//     selectedGame,
//     plyIndex,
//     branchMoves,
//   );

//   const goBack = () => {
//     if (branchMoves.length > 0) {
//       setBranchMoves((b) => b.slice(0, -1));
//       return;
//     }
//     setPlyIndex((p) => Math.max(0, p - 1));
//   };

//   const goForward = () => {
//     if (branchMoves.length === 0 && plyIndex < maxPly) {
//       setPlyIndex((p) => p + 1);
//     }
//   };

//   const goFirst = () => {
//     setBranchMoves([]);
//     setPlyIndex(0);
//   };
//   const goLast = () => {
//     setBranchMoves([]);
//     setPlyIndex(maxPly);
//   };

//   const toggleOrientation = () => {
//     setOrientation((prev) => (prev === "white" ? "black" : "white"));
//     setBranchMoves([]);
//     setPlyIndex(0);
//   };

//   const isPlaying: "white" | "black" = counter % 2 === 0 ? "white" : "black";

//   return (
//     <section className="flex flex-col grow pt-[170px] pb-16">
//       <div className="max-w-6xl w-full text-white font-sans flex flex-col items-center px-4 mx-auto">
//         <div className="flex items-center gap-3 mb-4 self-start">
//           <span className="text-sm text-gray-400">Board view:</span>
//           <button
//             type="button"
//             onClick={toggleOrientation}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
//               orientation === "white"
//                 ? "bg-white text-black border-gray-300"
//                 : "bg-[#1a1a1a] text-white border-gray-600"
//             }`}
//           >
//             <span
//               className={`w-3 h-3 rounded-full border ${
//                 orientation === "white"
//                   ? "bg-white border-gray-400"
//                   : "bg-gray-900 border-gray-500"
//               }`}
//             />
//             {orientation === "white" ? "White" : "Black"}
//           </button>
//         </div>

//         <div className="w-full bg-[#1e1e1e] rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8">
//           <div className="flex-1 space-y-6">
//             <div className="aspect-square bg-[#312e2b] rounded-lg overflow-hidden relative border-4 border-[#262421] flex flex-col min-h-0">
//               <GameColumn />

//               <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none p-1 text-[10px] text-gray-400">
//                 <span className="col-start-1 row-start-1">8</span>
//                 <span className="col-start-1 row-start-8 self-end">1</span>
//                 <span className="col-start-8 row-start-8 self-end justify-self-end">
//                   h
//                 </span>
//               </div>
//             </div>

//             <div className="bg-[#2a2a2a] rounded-xl flex items-center justify-between p-4 text-sm text-gray-300">
//               <button className="hover:text-white transition-colors">
//                 <img src={leftArrow} width={20} height={20} />
//               </button>
//               <span className="font-normal text-mute text-xs">
//                 {isPlaying === "white"
//                   ? "Playing: White"
//                   : isPlaying === "black"
//                     ? "Playing: Black"
//                     : `Move ${counter + 1} • to move`}
//               </span>
//               <button className="hover:text-white transition-colors">
//                 <img src={rightArrow} width={20} height={20} />
//               </button>
//             </div>
//           </div>
//           <AnalyzeColumn
//             currentFen={currentFen}
//             isTerminal={isTerminal}
//             selectedGameId={selectedGame?._id}
//           />
//         </div>

//         <AnalyzeButtons
//           setBranchMoves={setBranchMoves}
//           setPlyIndex={setPlyIndex}
//           branchMoves={branchMoves}
//           maxPly={maxPly}
//           plyIndex={plyIndex}
//           goBack={goBack}
//           goForward={goForward}
//           goFirst={goFirst}
//           goLast={goLast}
//         />
//       </div>
//     </section>
//   );
// };

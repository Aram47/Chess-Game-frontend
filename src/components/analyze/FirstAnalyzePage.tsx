import { useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import { figurePieces } from "../../helpers/chess-figures/FiguresChess";
import SignInModal from "../modal/SignInModal";

import "../../assets/css/style.scss";
import { BOARD_THEMES, type BoardTheme } from "../game/board-theme/boardThemes";

const MOVES = [
  ["e4", "e5"],
  ["Nf3", "Nc6"],
  ["Bc4", "Bc5"],
  ["c3", "Nf6"],
  ["d4", "exd4"],
  ["cxd4", "Bb4+"],
  ["Bd2", "Bxd2"],
  ["Nbxd2", "d5"],
  ["exd5", "Nxd5"],
  ["O-O", "O-O"],
  ["Re1", "Bg4"],
];

export default function ChessAnalysisHero() {
  const [currentMove, setCurrentMove] = useState(8);
  const [activeModal, setActiveModal] = useState(false);
  const [boardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);
  const theme = boardTheme ?? BOARD_THEMES[0];

  const squareStyles: Record<string, CSSProperties> = {};

  return (
    <div className="w-full grid grid-cols-2 items-center gap-22 px-[100px] min-h-screen font-barlow">
      {/* Left — Chess widget */}
      <div className="w-full">
        <div className="bg-[#1c1b18] border border-[rgba(206,184,110,0.15)] rounded-2xl p-6 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="grid grid-cols-[1.6fr_1fr] gap-6">
            <div className="w-full flex flex-col">
              <div className="relative overflow-hidden rounded-[10px] mx-auto w-full max-w-[304px]">
                <div className="board">
                  <Chessboard
                    options={{
                      boardOrientation: "white",
                      squareStyles,
                      pieces: figurePieces,
                      darkSquareStyle: {
                        backgroundColor: theme.dark,
                        color: theme.light,
                      },
                      lightSquareStyle: {
                        backgroundColor: theme.light,
                        color: theme.dark,
                      },
                    }}
                  />
                </div>
              </div>

              {/* Nav bar */}
              <div className="flex items-center justify-between bg-white/[0.03] border-1 border-white/[0.05] rounded-lg px-3 py-2 mt-3">
                <button
                  onClick={() => setCurrentMove((m) => Math.max(0, m - 1))}
                  className="text-[#7a7060] text-lg leading-none px-1 hover:text-[#E5CC7A] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                >
                  ‹
                </button>
                <span className="text-[#9a8f80] text-[11px] font-barlow tracking-wide">
                  Move {currentMove + 1} •{" "}
                  {currentMove % 2 === 0 ? "White" : "Black"} to move
                </span>
                <button
                  onClick={() =>
                    setCurrentMove((m) => Math.min(MOVES.length * 2 - 1, m + 1))
                  }
                  className="text-[#7a7060] text-lg leading-none px-1 hover:text-[#E5CC7A] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col">
              {/* Move list */}
              <div className="border-1 border-[#FFFFFF0D] rounded-[10px] py-2 px-3 bg-[#FFFFFF0D]">
                <p className="text-[#FCFAF2] text-[8px] tracking-widest uppercase mb-2 font-barlow">
                  All Moves
                </p>
                <div className="flex flex-col gap-px max-h-[90%] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {MOVES.map(([w, b], i) => (
                    <div
                      key={i}
                      className="grid items-center gap-x-0.5"
                      style={{ gridTemplateColumns: "25px 1fr 1fr" }}
                    >
                      <span className="text-center font-mono bg-[#00000033] rounded-[5px] px-1.5 py-1 text-[#4a4540] text-[6px] font-mono">
                        {i + 1}
                      </span>

                      <button
                        onClick={() => setCurrentMove(i * 2)}
                        className="text-left text-[6px] font-mono px-1.5 py-1 border-1 border-[#E5CC7A1A] transition-all duration-150 cursor-pointer bg-[#00000033] rounded-[5px] text-[#E5CC7A]"
                      >
                        {w}
                      </button>
                      <button
                        onClick={() => setCurrentMove(i * 2 + 1)}
                        className="text-left text-[6px] font-mono px-1.5 py-1 rounded transition-all duration-150 border-1 border-[#E5CC7A1A] cursor-pointer bg-[#00000033] rounded-[5px]"
                      >
                        {b}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Best Move card */}
              <div className="bg-white/[0.03] border border-[rgba(206,184,110,0.12)] rounded-[10px] px-3.5 py-3 mt-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r="6.5"
                      stroke="#E5CC7A"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M4.5 7.5L6.5 9.5L10.5 5.5"
                      stroke="#E5CC7A"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[#E5CC7A] text-xs font-barlow border-[#D4AF3708]">
                    Best Move
                  </span>
                </div>
                <p className="text-[#f0ead8] text-sm font-bold mb-0.5 m-0">
                  Nxe5
                </p>
                <p className="text-[#6b6560] text-[11px] font-barlow m-0">
                  Gains material advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Text */}
      <div className="w-full text-end">
        <h1 className="text-[clamp(40px,5vw,60px)] font-barlow font-bold text-[#f0ead8] leading-[1.1] mb-6 tracking-tight">
          <span className="text-[#E5CC7A]">Analyze</span> Your Games
        </h1>
        <p className="text-[#7a7468] text-xl leading-relaxed mb-10 font-barlow">
          Deep dive into your games with AI-powered analysis. Personalized AI
          suggestions will improve your strategy. Identify mistakes, discover
          improvements, and master strategic patterns with real-time feedback.
        </p>
        <button
          className="bg-[#E5CC7A] text-[#1a1810] rounded-full px-10 py-4 text-base font-barlow font-bold tracking-wide shadow-[0_8px_32px_rgba(229,204,122,0.25)] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(229,204,122,0.35)] transition-all duration-200 cursor-pointer border-none"
          onClick={() => setActiveModal(true)}
        >
          Start Analyzing
        </button>
      </div>
      {activeModal && <SignInModal onClose={() => setActiveModal(false)} />}
    </div>
  );
}

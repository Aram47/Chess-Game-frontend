import React from "react";
import ChessGame from "./chess";
import leftArrow from "../../assets/icons/analyze/leftArrow.svg";
import rightArrow from "../../assets/icons/analyze/rightArrow.svg";
import bestIcon from "../../assets/icons/analyze/best.svg";
import firstIcon from "../../assets/icons/analyze/firstMove.svg";
import nextIcon from "../../assets/icons/analyze/nextMove.svg";
import fullReport from "../../assets/icons/analyze/fullReport.svg";
import { NavButton } from "./buttons";

interface MoveLine {
  rank: number;
  move: string;
  evalScore: string;
}

const ChessAnalysisUI: React.FC = () => {
  const moveLines: MoveLine[] = [
    { rank: 1, move: "Nxe5", evalScore: "+0.8" },
    { rank: 2, move: "Nxe5", evalScore: "+0.8" },
    { rank: 3, move: "Nxe5", evalScore: "+0.8" },
  ];

  const [counter, setCounter] = React.useState(0);

  const handleMoveNavigation = (direction: "next" | "prev") => {
    setCounter((prev) => {
      if (direction === "next") {
        return Math.min(prev + 1, 39);
      }
      return Math.max(prev - 1, 0);
    });
  };

  const isPlaying: "white" | "black" = counter % 2 === 0 ? "white" : "black";

  return (
    <section className="flex flex-col grow pt-[170px] pb-16">
      <div className="max-w-3xl w-full text-white font-sans flex flex-col items-center px-4">
        <header className="text-center mb-12 max-w-2xl">
          <h1 className="text-6xl font-playfair font-black mb-6 tracking-tight">
            <span className="text-gold">Analyze</span> Your Games
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Deep dive into your games with powerful AI analysis. Identify
            mistakes, discover improvements, and master strategic patterns with
            real-time feedback.
          </p>
        </header>

        <div className="max-w-xl w-full bg-[#1e1e1e] rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="aspect-square bg-[#312e2b] rounded-lg overflow-hidden relative border-4 border-[#262421]">
              <ChessGame />

              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none p-1 text-[10px] text-gray-400">
                <span className="col-start-1 row-start-1">8</span>
                <span className="col-start-1 row-start-8 self-end">1</span>
                <span className="col-start-8 row-start-8 self-end justify-self-end">
                  h
                </span>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-xl flex items-center justify-between p-4 text-sm text-gray-300">
              <button
                className="hover:text-white transition-colors"
                onClick={() => handleMoveNavigation("prev")}
              >
                <img src={leftArrow} width={20} height={20} />
              </button>
              <span className="font-normal text-mute text-xs">
                {isPlaying === "white"
                  ? "Playing: White"
                  : isPlaying === "black"
                    ? "Playing: Black"
                    : `Move ${counter + 1} • to move`}
              </span>
              <button
                className="hover:text-white transition-colors"
                onClick={() => handleMoveNavigation("next")}
              >
                <img src={rightArrow} width={20} height={20} />
              </button>
            </div>
          </div>

          <div className="w-full md:w-72 flex flex-col gap-4">
            <div className="bg-[#262626] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Eval
                </span>
                <span className="text-[#4ade80] font-bold text-lg">+0.8</span>
              </div>
              <div className="h-2 w-full bg-[#3d3d3d] rounded-full overflow-hidden">
                <div className="h-full bg-[#4ade80] w-[65%]" />
              </div>
            </div>

            {/* Best Move Card */}
            <div className="bg-[#262626] border border-[#D4AF37]/20 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#4ade80] mb-2">
                <img src={bestIcon} width={16} height={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Best Move
                </span>
              </div>
              <div className="text-text font-bold mb-1">Nxe5</div>
              <p className="text-xs text-mute">Gains material advantage.</p>
            </div>

            {/* Engine Lines */}
            <div className="bg-[#262626] rounded-xl p-4 flex-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">
                Lines
              </span>
              <div className="space-y-3">
                {moveLines.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm font-medium"
                  >
                    <span className="text-gray-400">
                      {item.rank}.{" "}
                      <span className="text-white ml-2">{item.move}</span>
                    </span>
                    <span className="text-gray-500">{item.evalScore}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Control Bar */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <NavButton
          icon={<img src={firstIcon} alt="firstIcon" />}
          label="First Move"
        />
        <NavButton
          icon={<img src={leftArrow} alt="prevIcon" />}
          label="Previous"
        />

        {/* Primary Action */}
        <button className="bg-[#e9cf8b] hover:bg-[#d4af37] text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(233,207,139,0.3)]">
          <img src={nextIcon} alt="nextIcon" />
          Next Move
        </button>

        <NavButton
          icon={<img src={rightArrow} alt="rightArrow" />}
          label="Last Move"
          isLight
        />
        <NavButton
          icon={<img src={fullReport} alt="fullReport" />}
          label="Full Report"
        />
      </div>
    </section>
  );
};

export default ChessAnalysisUI;

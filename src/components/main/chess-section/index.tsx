import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type FC,
} from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { pieces } from "./piecesChess";
import figure from "../../../assets/icons/figure.png";

import PlaySection from "./play/playSection";
import MasterChessSection from "./master-section";
import style from "./style.module.scss";

const ChessMaster: FC = () => {
  const [game] = useState<Chess>(new Chess());
  const [phase, setPhase] = useState<"idle" | "entrance" | "exit">("idle");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const tilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, hovered: false });
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(function animate() {
    const t = tilt.current;
    t.x = lerp(t.x, t.targetX, 0.08);
    t.y = lerp(t.y, t.targetY, 0.08);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    setPhase("entrance");

    const timer = setTimeout(() => {
      setPhase("exit");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const onMouseEnter = useCallback(() => {
    tilt.current.hovered = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    tilt.current.hovered = false;
    tilt.current.targetX = 0;
    tilt.current.targetY = 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    tilt.current.targetX = -ny * 18;
    tilt.current.targetY = nx * 22;
  }, []);

  return (
    <section className={style.cm_hero}>

     <MasterChessSection phase={phase} />

      <div
        ref={wrapperRef}
        className={`${style.cm_board_outer} ${
          phase === "entrance"
            ? style.intro
            : phase === "exit"
              ? style.animateClass
              : ""
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <div className={style.cm_board}>
          <Chessboard
            options={{
              position: game.fen(),
              boardOrientation: "white",
              showNotation: false,
              pieces,
              lightSquareStyle: { background: "#F0D9B5" },
              darkSquareStyle: { background: "#B58863" },
            }}
          />
        </div>
      </div>

      {phase === "exit" && (
        <div className={`${style.cm_figure} ${style.sec_figure}`}>
          <img src={figure} alt="figure" />
        </div>
      )}
      
      <PlaySection />

    </section>
  );
};

export default ChessMaster;

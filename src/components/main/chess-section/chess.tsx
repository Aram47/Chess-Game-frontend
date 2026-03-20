import React, { useState, useRef, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { pieces } from "./piecesChess";

import style from "./style.module.scss";

const ChessMaster: React.FC = () => {
  const [game] = useState<Chess>(new Chess());

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
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

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
      <div className={`${style.cm_copy} ${style.leftSide}`}>
        <h1 className={style.cm_headline}>
          Master the <span>Art</span> of Chess
        </h1>

        <p className={style.cm_subline}>
          Elevate your game with AI-powered analysis, expert instruction, and a
          global community of chess enthusiasts.
        </p>
        <div className={style.cm_actions}>
          <button className={style.cm_btn_fill}>Start Playing</button>
          <button className={style.cm_btn_ghost}>Watch Demo</button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className={`${style.cm_board_outer} ${style.rightSide}`}
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
    </section>
  );
};

export default ChessMaster;

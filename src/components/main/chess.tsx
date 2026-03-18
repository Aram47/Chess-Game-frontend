import Header from "../header/Header";

import style from "./style.module.scss";

const P: Record<string, string> = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

const BOARD = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export default function ChessMaster() {
  return (
    <div className={style.cm_root}>
      <Header />
      <section className={style.cm_hero}>
        <div className={style.cm_copy}>
          <h1 className={style.cm_headline}>
            Master the <span>Art</span> of Chess
          </h1>
          <p className={style.cm_subline}>
            Elevate your game with AI-powered analysis, expert instruction, and
            a global community of chess enthusiasts.
          </p>
          <div className={style.cm_actions}>
            <button className={style.cm_btn_fill}>Start Playing</button>
            <button className={style.cm_btn_ghost}>Watch Demo</button>
          </div>
        </div>

        <div className={style.cm_board_outer}>
          <div className={style.cm_board}>
            {BOARD.map((row, ri) =>
              row.map((piece, ci) => {
                const isWhitePiece =
                  piece !== " " && piece === piece.toUpperCase();
                const isBlackPiece =
                  piece !== " " && piece === piece.toLowerCase();

                return (
                  <div
                    key={`${ri}-${ci}`}
                    className={`
                  ${style.cm_sq} 
                  ${(ri + ci) % 2 === 0 ? style.light : style.dark}
                  ${isWhitePiece ? style.white_p : ""}
                  ${isBlackPiece ? style.black_p : ""}
                `}
                  >
                    {piece !== " " ? P[piece] : null}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

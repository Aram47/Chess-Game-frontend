import type { ChessboardOptions } from "react-chessboard";
import king from "../../../assets/icons/figures/king.png";
import queen from "../../../assets/icons/figures/queen.png";
import rook from "../../../assets/icons/figures/rook.png";
import bishop from "../../../assets/icons/figures/bishop.png";
import knight from "../../../assets/icons/figures/knight.png";
import figure from "../../../assets/icons/figures/figure.png";

import whiteKing from "../../../assets/icons/figures/whiteKing.png";
import whiteQueen from "../../../assets/icons/figures/whiteQueen.png";
import whiteRook from "../../../assets/icons/figures/whiteRook.png";
import whiteBishop from "../../../assets/icons/figures/whiteBishop.png";
import whiteKnight from "../../../assets/icons/figures/whiteKnight.png";
import whiteFigure from "../../../assets/icons/figures/whiteFigure.png";

import style from "./style.module.scss";


export const pieces: ChessboardOptions["pieces"] = {
  wK: () => <img src={whiteKing} alt="whiteKing" className={style.chess_icon} />,
  wQ: () => <img src={whiteQueen} alt="whiteQueen" className={style.chess_icon} />,
  wR: () => <img src={whiteFigure} alt="whiteFigure" className={style.chess_icon} />,
  wB: () => <img src={whiteBishop} alt="whiteBishop" className={style.chess_icon} />,
  wN: () => <img src={whiteKnight} alt="whiteKnight" className={style.chess_icon} />,
  wP: () => <img src={whiteRook} alt="whiteRook" className={style.chess_icon} />,

  bK: () => <img src={king} alt="king" className={style.chess_icon} />,
  bQ: () => <img src={queen} alt="queen" className={style.chess_icon} />,
  bR: () => <img src={rook} alt="rook" className={style.chess_icon} />,
  bB: () => <img src={bishop} alt="bishop" className={style.chess_icon} />,
  bN: () => <img src={knight} alt="knight" className={style.chess_icon} />,
  bP: () => <img src={figure} alt="figure" />,
};

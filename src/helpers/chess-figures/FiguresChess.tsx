import type { ChessboardOptions } from "react-chessboard";
import king from "../../assets/icons/figures/game/blackKing.svg";
import queen from "../../assets/icons/figures/game/blackQuenn.svg";
import rook from "../../assets/icons/figures/game/blackRook.svg";
import bishop from "../../assets/icons/figures/game/blackBishop.svg";
import knight from "../../assets/icons/figures/game/blackKnight.svg";
import pawn from "../../assets/icons/figures/game/blackPawn.svg";

import whiteKing from "../../assets/icons/figures/game/whiteKing.svg";
import whiteQueen from "../../assets/icons/figures/game/whiteQuenn.svg";
import whiteRook from "../../assets/icons/figures/game/whiteRook.svg";
import whiteBishop from "../../assets/icons/figures/game/whiteBishop.svg";
import whiteKnight from "../../assets/icons/figures/game/whiteKnight.svg";
import whitePawn from "../../assets/icons/figures/game/whitePawn.svg";

import "../../assets/css/style.scss";

export const figurePieces: ChessboardOptions["pieces"] = {
  wK: ({ squareWidth }) => <img src={whiteKing} alt="wK" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  wQ: ({ squareWidth }) => <img src={whiteQueen} alt="wQ" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  wP: ({ squareWidth }) => <img src={whitePawn} alt="wP" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  wB: ({ squareWidth }) => <img src={whiteBishop} alt="wB" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  wN: ({ squareWidth }) => <img src={whiteKnight} alt="wN" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  wR: ({ squareWidth }) => <img src={whiteRook} alt="wR" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,

  bK: ({ squareWidth }) => <img src={king} alt="bK" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  bQ: ({ squareWidth }) => <img src={queen} alt="bQ" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  bP: ({ squareWidth }) => <img src={pawn} alt="bP" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  bB: ({ squareWidth }) => <img src={bishop} alt="bB" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  bN: ({ squareWidth }) => <img src={knight} alt="bN" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
  bR: ({ squareWidth }) => <img src={rook} alt="bR" style={{ width: squareWidth, height: squareWidth }} className="chess-icon" />,
};
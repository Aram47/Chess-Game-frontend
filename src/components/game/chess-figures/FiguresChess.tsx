import type { ChessboardOptions } from "react-chessboard";
import king from "../../../assets/icons/figures/game/blackKing.svg";
import queen from "../../../assets/icons/figures/game/blackQuenn.svg";
import rook from "../../../assets/icons/figures/game/blackRook.svg";
import bishop from "../../../assets/icons/figures/game/blackBishop.svg";
import knight from "../../../assets/icons/figures/game/blackKnight.svg";
import pawn from "../../../assets/icons/figures/game/blackPawn.svg";

import whiteKing from "../../../assets/icons/figures/game/whiteKing.svg";
import whiteQueen from "../../../assets/icons/figures/game/whiteQuenn.svg";
import whiteRook from "../../../assets/icons/figures/game/whiteRook.svg";
import whiteBishop from "../../../assets/icons/figures/game/whiteBishop.svg";
import whiteKnight from "../../../assets/icons/figures/game/whiteKnight.svg";
import whitePawn from "../../../assets/icons/figures/game/whitePawn.svg";

import "../style.scss";

export const figurePieces: ChessboardOptions["pieces"] = {
  wK: () => <img src={whiteKing} alt="whiteKing" className="chess-icon" />,
  wQ: () => <img src={whiteQueen} alt="whiteQueen" className="chess-icon" />,
  wP: () => <img src={whitePawn} alt="whitePawn" className="chess-icon" />,
  wB: () => <img src={whiteBishop} alt="whiteBishop" className="chess-icon" />,
  wN: () => <img src={whiteKnight} alt="whiteKnight" className="chess-icon" />,
  wR: () => <img src={whiteRook} alt="whiteRook" className="chess-icon" />,

  bK: () => <img src={king} alt="king" className="chess-icon" />,
  bQ: () => <img src={queen} alt="queen" className="chess-icon" />,
  bP: () => <img src={pawn} alt="pawn" className="chess-icon" />,
  bB: () => <img src={bishop} alt="bishop" className="chess-icon" />,
  bN: () => <img src={knight} alt="knight" className="chess-icon" />,
  bR: () => <img src={rook} alt="rook" className="chess-icon" />,
};

import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { pieces } from "../../components/main/chess-section/piecesChess";

import style from "./style.module.scss";

const ChessGame: React.FC = () => {
  const [game, setGame] = useState<Chess>(new Chess());

  function makeAMove(
    move: string | { from: string; to: string; promotion?: string },
    currentGame?: Chess,
  ) {
    try {
      const gameCopy = new Chess((currentGame ?? game).fen());
      const result = gameCopy.move(move);
      setGame(gameCopy);
      return { result, gameCopy };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  }

  function makeRandomMove(currentGame: Chess) {
    const possibleMoves = currentGame.moves();
    if (
      currentGame.isGameOver() ||
      currentGame.isDraw() ||
      possibleMoves.length === 0
    ) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex], currentGame);
  }

  function onPieceDrop({
    sourceSquare,
    targetSquare,
  }: {
    piece: { pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean {
    if (!targetSquare) return false;
    const piece = game.get(sourceSquare as any);
    if (!piece || piece.color !== game.turn()) return false;
    const moved = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (!moved) return false;

    setTimeout(() => makeRandomMove(moved.gameCopy), 200);

    return true;
  }

  return (
    <div className={style.cm_root}>
      <div className={style.cm_board_outer}>
        <div className={style.cm_board}>
          <Chessboard
            options={{
              position: game.fen(),
              boardOrientation: "white",
              showNotation: false,
              onPieceDrop,
              pieces,
              lightSquareStyle: { background: "#F0D9B5" },
              darkSquareStyle: { background: "#B58863" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChessGame;

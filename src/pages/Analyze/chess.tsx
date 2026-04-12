import { Chessboard } from "react-chessboard";
import { pieces } from "../../components/main/chess-section/piecesChess";
import style from "./style.module.scss";

interface GameColumnProps {
  fen: string | undefined;
  onMove: (move: { from: string; to: string; promotion: string }) => void;
}

export function GameColumn({ fen, onMove }: GameColumnProps) {
  function onDrop(sourceSquare: string, targetSquare: string) {
    onMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    return true;
  }

  return (
    <>
      <div className={style.cm_board_outer}>
        <div className={style.cm_board}>
          <Chessboard
            position={fen}
            onPieceDrop={onDrop}
            customPieces={pieces}
            customDarkSquareStyle={{ background: "#B58863" }}
            customLightSquareStyle={{ background: "#F0D9B5" }}
            showBoardNotation={false}
          />
        </div>
      </div>
    </>
  );
}

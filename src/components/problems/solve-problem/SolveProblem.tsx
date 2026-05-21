import { Chess } from "chess.js";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import { Link, useLocation, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { tryApplyMove } from "../../../utils/utils";
import { figurePieces } from "../../../helpers/chess-figures/FiguresChess";
import { useSubmitMoveMutation } from "../../../hooks/useProblemsHistory";
import { problemsApi } from "../../../api/problems";
import SolveHistory from "./SolveHistory";
import { DifficultyDots } from "../DifficultyDots";
import type { ChessProblem } from "../../../types/problems";
import type { MoveType } from "../../../types/gameType";
import { useTranslation } from "../../../hooks/useTranslation";

import leftIcon from "../../../assets/icons/analyze/left.svg";

const SolveProblem = () => {
  const { t } = useTranslation();
  const { problemId } = useParams();
  const location = useLocation();
  const stateProblem = (location.state as { problem?: ChessProblem } | null)
    ?.problem;

  const submitMoveMutation = useSubmitMoveMutation();
  const [activeProblem, setActiveProblem] = useState<ChessProblem | null>(
    stateProblem ?? null,
  );
  const [startError, setStartError] = useState<string | null>(null);
  const [branchMoves] = useState<MoveType[]>([]);
  const [plyIndex, setPlyIndex] = useState(0);

  const parsedId = Number(problemId);
  const effectiveId =
    stateProblem?.id ?? (Number.isFinite(parsedId) ? parsedId : null);

  useEffect(() => {
    if (!effectiveId) return;

    let cancelled = false;
    setStartError(null);

    void problemsApi
      .startProblem(effectiveId)
      .then((started) => {
        if (!cancelled) setActiveProblem(started);
      })
      .catch(() => {
        if (!cancelled) {
          setStartError(t("could_not_start_puzzle"));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [effectiveId]);

  const squareStyles: Record<string, CSSProperties> = {};

  const currentFen = useMemo(() => {
    const chess = new Chess(activeProblem?.fen ?? undefined);

    const applyMove = (move: string | MoveType) => {
      if (typeof move === "string") {
        try {
          chess.move(move);
        } catch {
          /* ignore */
        }
        return;
      }
      tryApplyMove(chess, move);
    };

    branchMoves.forEach((m) => applyMove(m));
    return chess.fen();
  }, [activeProblem?.fen, branchMoves]);

  const handleMove = (from: string, to: string) => {
    if (!activeProblem) return;
    submitMoveMutation.mutate(
      { id: activeProblem.id, move: { from, to } },
      {
        onSuccess: (updated) => setActiveProblem(updated),
      },
    );
  };

  if (!effectiveId && !stateProblem) {
    return (
      <div className="text-white text-center pt-20 ">
        <p className="text-[#A39589] mb-4">{t("select_puzzle")}</p>
        <Link to="/problems" className="text-[#E5CC7A] underline">
          {t("browse_puzzles")}
        </Link>
      </div>
    );
  }

  if (startError) {
    return (
      <div className="text-white text-center pt-20 ">
        <p className="text-[#A39589] mb-4">{startError}</p>
        <Link to="/problems" className="text-[#E5CC7A] underline">
          {t("back_to_puzzles")}
        </Link>
      </div>
    );
  }

  if (!activeProblem) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#E5CC7A]">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading puzzle" />
      </div>
    );
  }

  const moveHistory = activeProblem.moves?.length
    ? activeProblem.moves
    : (activeProblem.solutionMoves ?? branchMoves);

  return (
    <section className="w-full flex flex-col grow pt-[100px] pb-16 bg-[#1b1a17]">
      <header className="w-full text-center mb-8 px-4">
        <h1 className="text-3xl md:text-5xl text-gold font-playfair font-black">
          {activeProblem.description || t("chess_puzzle")}
        </h1>
      </header>
      <div className="px-8 mb-8">
        <Link
          to="/problems"
          className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
          aria-label="Back to puzzles"
        >
          <img src={leftIcon} alt="" />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 px-8">
        <div className="w-full lg:w-[60%] flex flex-col gap-8 border-[#CEB86E33] border rounded-[20px] p-8 bg-[#FFFFFF0D]">
          <div className="flex items-center justify-between bg-[#1C1C1C4D] px-4 py-3 rounded-[20px]">
            <div className="w-full flex items-center justify-between gap-x-3">
              <div className="flex flex-col text-[#A39589]">
                <span>{activeProblem.category?.name ?? t("puzzle")}</span>
                <span className="text-xs">{activeProblem.difficultyLevel}</span>
              </div>
              <DifficultyDots difficulty={activeProblem.difficultyLevel} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl max-w-[600px] w-full mx-auto">
            <div className="board">
              <Chessboard
                position={currentFen}
                onPieceDrop={(source, target) => {
                  handleMove(source, target);
                  return true;
                }}
                customPieces={figurePieces}
                customSquareStyles={squareStyles}
                customLightSquareStyle={{ background: "#EEEED2" }}
                customDarkSquareStyle={{ background: "#769656" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="bg-[#0000004D] rounded-[20px] justify-center p-4 text-sm text-[#F7EFD6] w-full mx-auto text-center">
              <p className="font-normal text-xs text-[#F7EFD6]">
                {submitMoveMutation.isPending
                  ? t("checking_move")
                  : t("your_turn")}
              </p>
            </div>
          </div>
        </div>
        <SolveHistory
          currentFen={currentFen}
          moveHistory={moveHistory}
          setPlyIndex={setPlyIndex}
          historyQuery={{ isPending: submitMoveMutation.isPending } as never}
        />
      </div>
    </section>
  );
};

export default SolveProblem;

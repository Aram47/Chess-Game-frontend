import type { AnalysisEvaluation } from "../../../types/analyzeTypes";

const PAWN_CLAMP = 5;

function whiteShare(evaluation: AnalysisEvaluation | null): number {
  if (!evaluation) return 0.5;
  const pawns =
    evaluation.kind === "mate"
      ? Math.sign(evaluation.value) * PAWN_CLAMP
      : evaluation.value / 100;
  const clamped = Math.max(-PAWN_CLAMP, Math.min(PAWN_CLAMP, pawns));
  return (clamped + PAWN_CLAMP) / (PAWN_CLAMP * 2);
}

export function formatEvalLabel(evaluation: AnalysisEvaluation | null): string {
  if (!evaluation) return "0.00";
  if (evaluation.kind === "mate") {
    const mate = Math.abs(evaluation.value);
    return evaluation.value >= 0 ? `+M${mate}` : `-M${mate}`;
  }
  const pawns = evaluation.value / 100;
  const sign = pawns > 0 ? "+" : "";
  return `${sign}${pawns.toFixed(2)}`;
}

export function EvalBar({
  evaluation,
  orientation,
  loading,
}: {
  evaluation: AnalysisEvaluation | null;
  orientation: "white" | "black";
  loading?: boolean;
}) {
  const share = loading ? 0.5 : whiteShare(evaluation);
  const whiteAtBottom = orientation === "white";
  const label = loading ? "…" : formatEvalLabel(evaluation);

  return (
    <div className="flex w-7 shrink-0 flex-col items-center gap-1 self-stretch">
      <span className="text-[10px] leading-none tabular-nums text-[var(--gold)]">
        {label}
      </span>
      <div
        className="relative min-h-0 w-3 flex-1 overflow-hidden rounded-full bg-[#3d3a34]"
        aria-hidden
      >
        <div
          className="absolute left-0 w-full bg-[#f0e8d0]"
          style={{
            height: `${share * 100}%`,
            ...(whiteAtBottom ? { bottom: 0 } : { top: 0 }),
          }}
        />
      </div>
    </div>
  );
}

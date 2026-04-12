import type { AnalysisEvaluation } from "../api/analysis";

export function formatEngineEvaluation(e?: AnalysisEvaluation): string {
  // 1. Handle the "undefined/loading" state first
  if (!e) return "0.00";

  if (e.kind === "mate") {
    if (e.value > 0) return `M+${e.value}`;
    if (e.value < 0) return `M${e.value}`;
    return "M0";
  }

  const pawns = e.value / 100;
  const sign = pawns > 0 ? "+" : "";
  return `${sign}${pawns.toFixed(2)}`;
}

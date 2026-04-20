import type { AnalysisEvaluation } from '../api/analysis';

/**
 * Human-readable Stockfish score (side to move perspective).
 */
export function formatEngineEvaluation(e: AnalysisEvaluation): string {
  if (e.kind === 'mate') {
    if (e.value > 0) return `M+${e.value}`;
    if (e.value < 0) return `M${e.value}`;
    return 'M0';
  }
  const pawns = e.value / 100;
  const sign = pawns > 0 ? '+' : '';
  return `${sign}${pawns.toFixed(2)}`;
}

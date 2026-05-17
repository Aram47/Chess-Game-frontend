import {
  formatMoveSquares,
  isWhitePly,
  moveNumberForPly,
} from "../../lib/chess/formatMove";

interface MoveHistoryEntryProps {
  plyIndex: number;
  from: string;
  to: string;
  onSelect?: (plyIndex: number) => void;
  isActive?: boolean;
}

export function MoveHistoryEntry({
  plyIndex,
  from,
  to,
  onSelect,
  isActive = false,
}: MoveHistoryEntryProps) {
  const white = isWhitePly(plyIndex);
  const moveLabel = formatMoveSquares(from, to);

  return (
    <div
      className={`flex items-center gap-3 rounded-[10px] px-2 py-2 ${
        white ? "bg-[#00000033]" : "bg-[#0000001a] pl-8"
      } ${isActive ? "ring-1 ring-[#E5CC7A]/60" : ""}`}
    >
      <span
        className="w-7 shrink-0 text-right text-[10px] font-medium text-[#E5CC7A]"
        aria-hidden={!white}
      >
        {white ? `${moveNumberForPly(plyIndex)}.` : ""}
      </span>

      <button
        type="button"
        onClick={() => onSelect?.(plyIndex + 1)}
        disabled={!onSelect}
        className={`flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left text-sm transition-colors ${
          onSelect ? "hover:bg-white/5 rounded-md px-2 py-1 -mx-2 -my-1" : ""
        }`}
      >
        <span
          className={`text-[10px] uppercase tracking-wide ${
            white ? "text-[#E5CC7A]" : "text-[#A39589]"
          }`}
        >
          {white ? "White" : "Black"}
        </span>
        <span
          className={`font-medium tabular-nums ${white ? "text-[#F7EFD6]" : "text-[#CFCFCF]"}`}
        >
          {moveLabel}
        </span>
      </button>
    </div>
  );
}

import { formatMoveSquares } from "../../../lib/chess/formatMove";

interface Props {
  index: number;
  from: string;
  to: string;
  setPlyIndex?: (index: number) => void;
}

const SecondStep = ({ index, from, to, setPlyIndex }: Props) => {
  return (
    <div
      key={index}
      className="flex items-center gap-x-4 bg-[#0000001a] py-2 pl-[40px] rounded-[10px]"
    >
      <button
        type="button"
        onClick={() => setPlyIndex?.(index + 1)}
        disabled={!setPlyIndex}
        className="text-left px-2 py-1 rounded text-sm text-[#F7EFD6] flex items-center gap-1 hover:bg-white/5 transition-colors disabled:cursor-default"
      >
        <span className="font-medium tabular-nums">{formatMoveSquares(from, to)}</span>
      </button>
    </div>
  );
};

export default SecondStep;

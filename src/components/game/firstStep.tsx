interface Props {
  setPlyIndex: (index: number) => void;
  index: number;
  from: string;
  isWhite: boolean;
}
const FirstStep = ({ setPlyIndex, index, from, isWhite }: Props) => {
  return (
    <div
      key={index}
      className="flex items-center gap-x-4 bg-[#00000033] p-2 rounded-[10px]"
    >
      {isWhite && (
        <span className="w-6 text-[10px] text-[#E5CC7A] text-right">
          {Math.floor(index / 2) + 1}.
        </span>
      )}
      <button
        onClick={() => setPlyIndex(index + 1)}
        className={` ${isWhite ? "px-2" : "pl-[50px]"} text-left  py-1 rounded text-sm text-[#E5CC7A] flex items-center gap-1 hover:bg-white/5 transition-colors}`}
      >
        <span className="font-medium">{from}</span>
      </button>
    </div>
  );
};

export default FirstStep;

interface Props {
  index: number;
  to: string;
  isWhite: boolean;
}
const SecondStep = ({ index, to, isWhite }: Props) => {
  return (
    <div
      key={index}
      className={`${isWhite ? "pl-[50px]" : "pl-0"} flex items-center gap-x-4 bg-[#00000033] py-2 pl-[50px] rounded-[10px]`}
    >
      <button className="text-left px-2 py-1 rounded text-sm text-[#F7EFD6] flex items-center gap-1 hover:bg-white/5 transition-colors">
        <span className="font-medium">{to}</span>
      </button>
    </div>
  );
};

export default SecondStep;

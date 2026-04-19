interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-[48px] h-[24px] rounded-full transition-all duration-300 flex-shrink-0 ${
      checked ? "bg-[linear-gradient(90deg,#E5CC7A_0%,#F4E09E_100%)]" : "bg-[#FFFFFF0D]"
    }`}
  >
    <span
      className={`absolute top-[3px] right-[25px] w-[18px] h-[18px] rounded-full transition-all duration-300 ${
        checked
          ? "translate-x-[21px] bg-[#1C1C1C]"
          : "translate-x-[3px] bg-[#676767]"
      }`}
    />
  </button>
);

interface ToggleRowProps {
  name: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export const ToggleRow = ({ name, desc, checked, onChange }: ToggleRowProps) => (
  <div
    className={`flex items-center justify-between py-2.5`}
  >
    <div>
      <p className="font-normal text-[#CFCFCF]">{name}</p>
      <p className="text-sm text-[#A39589] mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);
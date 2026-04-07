interface PlayModalProps {
  onClose: () => void;
  title?: string;
  text1?: string;
  text2?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const PlayModal = ({
  onClose,
  title,
  text1,
  text2,
  className,
  children,
  style,
}: PlayModalProps) => {
  return (
    <div
      className={`relative w-full rounded-2xl bg-[#1e1e1e] border border-[#333] p-6 ${className ?? "max-w-sm"}`}
      style={style}
    >
      <div className="flex flex-col gap-2">
        <span
          onClick={onClose}
          className="absolute top-2 right-2 text-[#A39589] w-6 h-6 text-2xl flex items-center justify-center cursor-pointer"
        >
          &times;
        </span>
        <div className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-medium text-[#CFCFCF]">{title}</h2>
          {children}
        </div>

        {(text1 || text2) && (
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="bg-[#333] text-white hover:bg-[#555] py-2.5 px-6 rounded-3xl border-[#E5CC7A] border text-sm font-semibold text-[#CFCFCF]"
            >
              {text1}
            </button>
            <button
              onClick={onClose}
              className="bg-[#E5CC7A] text-black hover:bg-[#d4b86a] py-2.5 px-6 rounded-3xl text-sm font-semibold"
              style={{
                background: "linear-gradient(180deg, #E5CC7A 0%, #F4E09E 100%)",
                boxShadow: "0px 4px 20px 0px #E5CC7A4D",
              }}
            >
              {text2}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayModal;

export const RoomCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="w-full bg-[#252525] border border-[#333] hover:border-[#D4AF37] rounded-[150px] p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors">
    <div className="w-11 h-11 rounded-full bg-[#2f2f2f] border border-[#3a3a3a] flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col items-center gap-y-2">
      <p className="text-[#F7EFD6] font-normal text-sm">{title}</p>
      <p className="text-[var(--muted)] text-xs text-center leading-relaxed font-barlow">
        {description}
      </p>
    </div>
  </div>
);

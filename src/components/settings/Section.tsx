import type { SectionProps } from "../../types/settingsType";

export const Section = ({ icon, title, subtitle, children }: SectionProps) => (
  <div
    className="bg-[#FFFFFF0D] border border-[#CEB86E26] rounded-[24px] p-8 font-barlow
"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-[linear-gradient(135deg,_#E5CC7A_0%,_#E7CF7F_14.29%,_#E9D284_28.57%,_#EBD58A_42.86%,_#EED78F_57.14%,_#F0DA94_71.43%,_#F2DD99_85.71%,_#F4E09E_100%)] rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-md font-normal text-[#CFCFCF]">{title}</p>
        <p className="text-sm text-[#A39589] mt-0.5">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

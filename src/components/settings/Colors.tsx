import { Section } from "./Section";
import { useTranslation } from "../../hooks/useTranslation";
import { ColorsIcon } from "../../assets/icons/settings/colors";
import { Toggle } from "../../helpers/Toggle";

interface ColorsState {
  classic: boolean;
  brown: boolean;
  blue: boolean;
}

interface Props {
  colors: ColorsState;
  setColors: React.Dispatch<React.SetStateAction<ColorsState>>;
}

const COLOR_OPTIONS = [
  {
    id: "classic" as keyof ColorsState,
    name: "Classic",
    lightColor: "bg-[#EEEED2]",
    darkColor: "bg-[#769656]",
  },
  {
    id: "brown" as keyof ColorsState,
    name: "Brown",
    lightColor: "bg-[#F0D9B5]",
    darkColor: "bg-[#B58863]",
  },
  {
    id: "blue" as keyof ColorsState,
    name: "Blue",
    lightColor: "bg-[#D5E5F5]",
    darkColor: "bg-[#4A7BA7]",
  },
];

const Colors = ({ colors, setColors }: Props) => {
  const { t } = useTranslation();

  const handleToggle = (id: keyof ColorsState) => {
    setColors((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Section
      icon={<ColorsIcon />}
      title={t("board_colors")}
      subtitle={t("manage_notification")}
    >
      <div className="flex flex-col gap-y-4">
        {COLOR_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-1.5">
                <span className={`w-[50px] h-[30px] rounded-md ${option.lightColor}`} />
                <span className={`w-[50px] h-[30px] rounded-md ${option.darkColor}`} />
              </div>
              <span className="text-[var(--text-h)] font-medium text-sm text-capitalize">
                {option.name}
              </span>
            </div>
            <Toggle
              checked={colors[option.id]}
              onChange={() => handleToggle(option.id)}
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Colors;

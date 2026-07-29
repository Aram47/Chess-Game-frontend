import { Loader2 } from "lucide-react";
import { Achievement } from "./achievement";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import { useProfile } from "../../../context/ProfileContext";
import { useAchievements } from "../../../hooks/useAchievements";
import { API_BASE_URL } from "../../../api/axiosIntance";
import { useTranslation } from "../../../hooks/useTranslation";

function achievementIconUrl(iconUrl: string): string {
  if (iconUrl.startsWith("http")) return iconUrl;
  const base = API_BASE_URL.replace(/\/$/, "");
  return `${base}${iconUrl.startsWith("/") ? iconUrl : `/${iconUrl}`}`;
}

const SectionList = () => {
  const { t } = useTranslation();
  const { profile } = useProfile();
  const { data, isLoading, isError, refetch } = useAchievements(
    Boolean(profile),
  );

  const achievements = Array.isArray(data) ? data : [];
  const total = achievements.length;

  return (
    <div className="w-full flex flex-col gap-y-8">
      <SectionWrapper
        title={t("achievements")}
        extra={
          total > 0
            ? t("achievements_available", { count: total })
            : isLoading
              ? t("loading")
              : undefined
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-[#CEB86E]" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-[#A39589]">{t("could_not_load_achievements")}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="text-sm text-[#E5CC7A] underline"
            >
              {t("retry")}
            </button>
          </div>
        ) : achievements.length === 0 ? (
          <p className="text-sm text-[#A39589] py-6 text-center">
            {t("no_achievements")}
          </p>
        ) : (
          <div className="flex gap-4 overflow-visible py-6 scrollbar-hide flex-wrap">
            {achievements.map((item) => (
              <Achievement
                key={item.name}
                icon={
                  <img
                    src={achievementIconUrl(item.iconUrl)}
                    alt=""
                    width={35}
                    height={35}
                    className="rounded object-cover bg-red-300"
                  />
                }
                label={item.name}
                text={item.description}
                unlocked={false}
              />
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export default SectionList;

import { DeepIcon } from "../../assets/icons/about/deepIcon.tsx";
import { AnalysisIcon } from "../../assets/icons/about/analysisIcon.tsx";
import { FeedbackIcon } from "../../assets/icons/about/feedbackIcon.tsx";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";

const OurStory = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <>
      <section
        className={`rounded-3xl p-8 md:p-10 mb-8 backdrop-blur-md ${
          theme === "dark" ? "bg-white/[0.03]" : "bg-white/90"
        }`}
        style={{
          borderImageSource:
            theme === "dark"
              ? "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)"
              : "linear-gradient(178.16deg, rgba(218, 119, 86, 0.2) 1.3%, rgba(163, 149, 137, 0.2) 97.77%)",
          borderImageSlice: 1,
          border: "1px solid transparent",
        }}
      >
        <h2 className="text-2xl font-medium text-[#E5CC7A] mb-4">
          {t("our_story_title")}
        </h2>
        <p className="text-md leading-relaxed text-[#A39589] my-3">
          {t("our_story_text")}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Left Column: Mission + Instant Feedback */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Mission Card - Uses flex-1 to fill half the height if needed */}
          <div
            className={`border border-white/10 rounded-3xl p-8 flex-1 ${
              theme === "dark" ? "bg-white/5" : "bg-white/90"
            }`}
            style={{
              borderImageSource:
                theme === "dark"
                  ? "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)"
                  : "linear-gradient(178.16deg, rgba(218, 119, 86, 0.2) 1.3%, rgba(163, 149, 137, 0.2) 97.77%)",
              borderImageSlice: 1,
              border: "1px solid transparent",
            }}
          >
            <h2 className="text-2xl font-medium text-[#E5CC7A] mx-0">
              {t("our_mission_title")}
            </h2>
            <p className="text-md text-[#A39589] leading-relaxed mt-3">
              {t("our_mission_text")}
            </p>
          </div>

          {/* Instant Feedback Card */}
          <div
            className={`border border-white/10 rounded-3xl p-8 flex-1 ${
              theme === "dark" ? "bg-white/5" : "bg-white/90"
            }`}
            style={{
              borderImageSource:
                theme === "dark"
                  ? "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)"
                  : "linear-gradient(178.16deg, rgba(218, 119, 86, 0.2) 1.3%, rgba(163, 149, 137, 0.2) 97.77%)",
              borderImageSlice: 1,
              border: "1px solid transparent",
            }}
          >
            <div className="bg-[#FFFFFF0D] rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center">
              <FeedbackIcon />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">
                {t("instant_feedback_title")}
              </h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                {t("instant_feedback_text")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Understanding + Professional Analysis */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Deep Understanding Card */}
          <div
            className={`border border-white/10 rounded-3xl p-8 flex-1 ${
              theme === "dark" ? "bg-white/5" : "bg-white/90"
            }`}
            style={{
              borderImageSource:
                theme === "dark"
                  ? "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)"
                  : "linear-gradient(178.16deg, rgba(218, 119, 86, 0.2) 1.3%, rgba(163, 149, 137, 0.2) 97.77%)",
              borderImageSlice: 1,
              border: "1px solid transparent",
            }}
          >
            <div className="bg-[#FFFFFF0D] rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center">
              <DeepIcon />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">
                {t("deep_understanding_title")}
              </h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                {t("deep_understanding_text")}
              </p>
            </div>
          </div>

          {/* Professional Analysis Card */}
          <div
            className={`border border-white/10 rounded-3xl p-8 flex-1 ${
              theme === "dark" ? "bg-white/5" : "bg-white/90"
            }`}
            style={{
              borderImageSource:
                theme === "dark"
                  ? "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)"
                  : "linear-gradient(178.16deg, rgba(218, 119, 86, 0.2) 1.3%, rgba(163, 149, 137, 0.2) 97.77%)",
              borderImageSlice: 1,
              border: "1px solid transparent",
            }}
          >
            <div
              className={`rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center ${theme === "dark" ? "bg-[#FFFFFF0D]" : "bg-[#DA775614]"}`}
            >
              <AnalysisIcon />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">
                {t("professional_analysis_title")}
              </h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                {t("professional_analysis_text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;

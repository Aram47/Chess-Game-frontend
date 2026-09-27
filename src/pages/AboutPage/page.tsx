import OurStory from "../../components/about/OurStory";
import Team from "../../components/about/Team";
import ArrowLeft from "../../assets/icons/about/arrowLeft.svg";
import Ready from "../../components/about/Ready";
import figure from "../../assets/icons/figure.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { useTheme } from "../../context/ThemeContext";

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <>
      <div className="min-h-screen text-gray-300  p-6 md:p-12 relative">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <img
            src={figure}
            alt="figure"
            /* Adjust scale-150 to scale-200 or scale-[3] as needed */
            className="scale-[2] opacity-20 object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto mt-8 relative z-10">
          <div className="mb-8 flex items-center gap-4">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#CEB86E33] hover:bg-[#E5CC7A4D] transition-all cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={ArrowLeft} alt="Arrow Left" />
            </button>
            <p className="text-[#A39589] text-lg leading-relaxed">
              {t("about_subtitle")}
            </p>
          </div>

          {/* Our Story */}
          <OurStory />

          {/* Team Section */}
          <Team />

          {/* CTA Section */}
          <Ready />
        </div>
      </div>

      <div className="flex justify-between border-t border-[#DA775633] w-[95%] p-8">
        <span
          className={`${theme === "dark" ? "text-[#A39589]" : "text-[#5E6470]"}`}
        >
          {t("footer_copyright")}
        </span>
        <div
          className={`flex items-center gap-6 ${theme === "dark" ? "text-[#A39589]" : "text-[#5E6470]"}`}
        >
          <span>{t("footer_privacy")}</span>
          <span>{t("footer_terms")}</span>
          <span>{t("footer_cookies")}</span>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

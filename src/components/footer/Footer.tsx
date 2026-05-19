import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import type { StringKey } from "../../constants/strings";
import style from "./footer.module.scss";

type FooterLink = { labelKey: StringKey; href: string };
type FooterColumn = { titleKey: StringKey; links: FooterLink[] };

const footerColumns: FooterColumn[] = [
  {
    titleKey: "footer_platform",
    links: [
      { labelKey: "footer_play_online", href: "/play" },
      { labelKey: "footer_tournaments", href: "/tournaments" },
      { labelKey: "footer_puzzles", href: "/puzzles" },
      { labelKey: "footer_analysis_board", href: "/analysis" },
    ],
  },
  {
    titleKey: "footer_learn",
    links: [
      { labelKey: "footer_video_library", href: "/learn/videos" },
      { labelKey: "footer_articles", href: "/learn/articles" },
      { labelKey: "footer_opening_db", href: "/learn/openings" },
    ],
  },
  {
    titleKey: "footer_community",
    links: [
      { labelKey: "footer_forums", href: "/community/forums" },
      { labelKey: "footer_clubs", href: "/community/clubs" },
      { labelKey: "footer_events", href: "/community/events" },
      { labelKey: "footer_blog", href: "/community/blog" },
    ],
  },
  {
    titleKey: "footer_company",
    links: [
      { labelKey: "footer_about_us", href: "/company/about" },
      { labelKey: "footer_careers", href: "/company/careers" },
      { labelKey: "footer_support", href: "/company/support" },
      { labelKey: "footer_contact", href: "/company/contact" },
    ],
  },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={style.footer}>
      <div className={style.footer_columns}>
        {footerColumns.map((col) => (
          <div key={col.titleKey} className={style.footer_column}>
            <h3 className={style.footer_column_title}>{t(col.titleKey)}</h3>
            <ul className={style.footer_column_links}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={style.footer_bottom}>
        <p>
          {t("footer_copyright")}
          <span className={style.footer_bottom_divider}>|</span>
          <a href="/terms">{t("footer_terms")}</a>
          <span className={style.footer_bottom_divider}>|</span>
          <a href="/privacy">{t("footer_privacy")}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

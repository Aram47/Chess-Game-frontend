import { Link } from "react-router-dom";
import style from "./footer.module.scss";

const footerData = [
  {
    title: "Platform",
    links: [
      { label: "Play Online", href: "/play" },
      { label: "Tournaments", href: "/tournaments" },
      { label: "Puzzles", href: "/puzzles" },
      { label: "Analysis Board", href: "/analysis" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Chess Classes", href: "/learn/classes" },
      { label: "Video Library", href: "/learn/videos" },
      { label: "Articles", href: "/learn/articles" },
      { label: "Opening Database", href: "/learn/openings" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Forums", href: "/community/forums" },
      { label: "Clubs", href: "/community/clubs" },
      { label: "Events", href: "/community/events" },
      { label: "Blog", href: "/community/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Support", href: "/company/support" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer_columns}>
        {footerData.map((col) => (
          <div key={col.title} className={style.footer_column}>
            <h3 className={style.footer_column_title}>{col.title}</h3>
            <ul className={style.footer_column_links}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={style.footer_bottom}>
        <p>
          © 2026 ChessMaster Pro. All rights reserved.
          <span className={style.footer_bottom_divider}>|</span>
          <a href="/terms">Terms of Service</a>
          <span className={style.footer_bottom_divider}>|</span>
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

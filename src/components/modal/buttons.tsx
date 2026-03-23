import { Link } from "react-router-dom";

export const SocialButton = ({ text }: { text: string }) => (
  <Link
    to="/"
    className="w-full flex items-center gap-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-white py-5 pl-7 rounded-lg transition-colors"
  >
    <div className="flex items-center gap-x-3">
      <span>{text}</span>
    </div>
  </Link>
);

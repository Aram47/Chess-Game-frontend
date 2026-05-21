import { useState } from "react";
import { Link } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { figurePieces } from "../../helpers/chess-figures/FiguresChess";
import SignInModal from "../modal/SignInModal";
import { useTranslation } from "../../hooks/useTranslation";
import { BOARD_THEMES, type BoardTheme } from "../game/board-theme/boardThemes";

import "../../assets/css/style.scss";

const PREVIEW_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function ChessAnalysisHero() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState(false);
  const [boardTheme] = useState<BoardTheme>(BOARD_THEMES[0]);
  const theme = boardTheme;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 lg:px-[100px] min-h-screen ">
      <div className="w-full order-2 lg:order-1">
        <div className="bg-[#1c1b18] border border-[rgba(206,184,110,0.15)] rounded-2xl p-6 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          <div className="relative overflow-hidden rounded-[10px] mx-auto w-full max-w-[304px]">
            <Chessboard
              options={{
                boardOrientation: "white",
                position: PREVIEW_FEN,
                pieces: figurePieces,
                allowDragging: false,
                darkSquareStyle: {
                  backgroundColor: theme.dark,
                  color: theme.light,
                },
                lightSquareStyle: {
                  backgroundColor: theme.light,
                  color: theme.dark,
                },
              }}
            />
          </div>
          <p className="text-center text-[#7a7060] text-xs mt-4">
            {t("sign_in_to_analyze")}
          </p>
        </div>
      </div>

      <div className="w-full text-center lg:text-end order-1 lg:order-2">
        <h1 className="text-[clamp(40px,5vw,60px)] font-bold text-[#f0ead8] leading-[1.1] mb-6 tracking-tight">
          {t("analyze_your_games")}
        </h1>
        <p className="text-[#7a7468] text-xl leading-relaxed mb-10 ">
          {t("analyze_subtitle")}
        </p>
        <button
          type="button"
          className="bg-[#E5CC7A] text-[#1a1810] rounded-full px-10 py-4 text-base  font-bold tracking-wide shadow-[0_8px_32px_rgba(229,204,122,0.25)] hover:scale-[1.03] transition-all duration-200 cursor-pointer border-none"
          onClick={() => setActiveModal(true)}
        >
          {t("start_analyzing")}
        </button>
        <p className="mt-4 text-sm text-[#A39589]">
          {t("already_have_account")}
          <Link to="/play" className="text-[#E5CC7A] underline">
            {t("already_have_account_play")
              .replace(t("already_have_account"), "")
              .trim()}
          </Link>
        </p>
      </div>
      {activeModal && (
        <SignInModal
          onClose={() => setActiveModal(false)}
          onLoginSuccess={() => setActiveModal(false)}
          onSwitchToRegister={() => {}}
          onSwitchToReset={() => {}}
        />
      )}
    </div>
  );
}

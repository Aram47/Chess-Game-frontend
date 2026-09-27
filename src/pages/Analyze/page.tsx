import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "../../hooks/useTranslation";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";
import { ChessAnalysisProvider } from "../../providers/AnalysisProvider";
import { getMyGameHistory } from "../../api/history";
import AnalyzeColumn from "../../components/analyze/containers/AnalyzeColumn";
import LeftColumn from "../../components/analyze/containers/LeftColumn";
import NotPlayed from "../../components/analyze/NotPlayed";
import ChessAnalysisHero from "../../components/analyze/FirstAnalyzePage";
import leftIcon from "../../assets/icons/analyze/leftIcon.svg";

const AnalysisContent = () => {
  const { t } = useTranslation();
  const { setGames, games, selectedGameId, setSelectedGameId } =
    useChessAnalysis();
  const [fen, setFen] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["game-history"],
    queryFn: async () => {
      const data = await getMyGameHistory(1, 50);
      setGames(data.data || []);
      return data;
    },
    enabled: true,
  });

  useEffect(() => {
    if (games.length > 0 && !selectedGameId) {
      setSelectedGameId(games[0]._id);
    }
  }, [games, selectedGameId, setSelectedGameId]);

  if (isLoading)
    return (
      <div className="text-[#E5CC7A] p-20 text-center  text-2xl">
        {t("loading_history")}
      </div>
    );

  if (selectedGameId) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 pb-3 md:flex-row">
        <div className="flex min-h-0 flex-[1.4] flex-col md:flex-1">
          <LeftColumn onFenChange={setFen} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:w-[34%] md:flex-none">
          <AnalyzeColumn fen={fen} />
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-8 animate-in slide-in-from-bottom-4 duration-500">
      <NotPlayed games={games} />
    </div>
  );
};

export const ChessAnalysisUI = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <ChessAnalysisProvider>
      {!user ? (
        <ChessAnalysisHero />
      ) : (
        <section className="flex h-[calc(100dvh-var(--header-band))] w-full flex-col overflow-hidden">
          <div className="flex shrink-0 items-center px-4 py-2">
            <Link
              to="/"
              aria-label={t("nav_analyze")}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E5CC7A]"
            >
              <img src={leftIcon} alt="" />
            </Link>
          </div>
          <AnalysisContent />
        </section>
      )}
    </ChessAnalysisProvider>
  );
};

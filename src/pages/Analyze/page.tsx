import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";
import { ChessAnalysisProvider } from "../../providers/AnalysisProvider";
import { getMyGameHistory } from "../../api/history";
import AnalyzeColumn from "../../components/analyze/containers/AnalyzeColumn";
import LeftColumn from "../../components/analyze/containers/LeftColumn";

import leftIcon from "../../assets/icons/analyze/left.svg";
import NotPlayed from "../../components/analyze/NotPlayed";
import ChessAnalysisHero from "../../components/analyze/FirstAnalyzePage";

const AnalysisContent = () => {
  const { setGames, games, selectedGameId, setSelectedGameId } =
    useChessAnalysis();

  const { isLoading } = useQuery({
    queryKey: ["game-history"],
    queryFn: async () => {
      const data = await getMyGameHistory(1, 50);
      setGames(data.data || []);
      return data;
    },
  });

  useEffect(() => {
    if (games.length > 0 && !selectedGameId) {
      setSelectedGameId(games[0]._id);
    }
  }, [games, selectedGameId, setSelectedGameId]);

  if (isLoading)
    return (
      <div className="text-[#E5CC7A] p-20 text-center font-barlow text-2xl">
        Loading History...
      </div>
    );

  if (selectedGameId) {
    return (
      <div className="flex flex-col lg:flex-row items-stretch gap-8 px-8">
        <div className="lg:w-[64%]">
          <LeftColumn />
        </div>
        <div className="lg:w-[36%]">
          <AnalyzeColumn winner={null} />
        </div>
      </div>
    );
  }
  return (
    <div className="px-8 animate-in slide-in-from-bottom-4 duration-500">
      <NotPlayed games={games} />
    </div>
  );
};

export const ChessAnalysisUI = () => {
  const { user } = useAuth();

  return (
    <ChessAnalysisProvider>
      {!user ? (
        <ChessAnalysisHero />
      ) : (
        <section className="w-full flex flex-col grow pt-[100px] pb-16 bg-[#1b1a17]">
          <header className="w-full text-center mb-8">
            <h1 className="text-6xl text-gold font-playfair font-black">
              Game Analysis
            </h1>
          </header>
          <div className="px-8 mb-8">
            <Link
              to="/"
              className="w-[72px] flex justify-center border-2 border-[#E5CC7A] py-2.5 rounded-3xl"
            >
              <img src={leftIcon} alt="back" />
            </Link>
          </div>
          <AnalysisContent />
        </section>
      )}
    </ChessAnalysisProvider>
  );
};

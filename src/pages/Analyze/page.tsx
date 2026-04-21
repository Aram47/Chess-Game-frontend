import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyGameHistory } from "../../api/history";
import AnalyzeColumn from "../../components/analyze/AnalyzeColumn";

import leftIcon from "../../assets/icons/analyze/left.svg";
import LeftColumn from "../../components/analyze/LeftColumn";
import { ChessAnalysisProvider } from "../../providers/AnalysisProvider";
import { useChessAnalysis } from "../../context/ChessAnalysisContext";
import { useEffect } from "react";
// import AllPlayedGames from "../../components/analyze/AllPlayedGames";

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
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 px-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-4">
          <LeftColumn />
        </div>
        <AnalyzeColumn />
      </div>
    );
  }
  return (
    <div className="px-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* <AllPlayedGames games={games} /> */}
      <LeftColumn />
      <AnalyzeColumn />
    </div>
  );
};

export const ChessAnalysisUI = () => {
  return (
    <ChessAnalysisProvider>
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
    </ChessAnalysisProvider>
  );
};

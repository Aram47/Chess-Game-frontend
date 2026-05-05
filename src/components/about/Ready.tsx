import { useNavigate } from "react-router-dom";
import Trophy from "../../assets/icons/about/trophy.svg";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import SignInModal from "../modal/SignInModal";

const Ready = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowSignIn(true);
    } else {
      navigate("/play");
    }
  };
  return (
    <footer className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center font-barlow">
      <div className="bg-white/10 w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-8 p-3">
        <img src={Trophy} alt="Trophy" width={40} height={40} />
      </div>
      <h2 className="text-2xl font-medium text-[#E5CC7A] mb-1">
        Ready to Improve Your Game?
      </h2>
      <p className="text-[#A39589] max-w-xl mx-auto mb-8">
        Join thousands of players who are already using ChessMaster to analyze
        their games, learn from AI insights, and elevate their chess to the next
        level.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="px-11 py-3 bg-yellow-200 text-[#1C1C1C] text-sm font-semibold hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] font-bold rounded-full transition-all cursor-pointer hover:-translate-y-[2px] duration-800"
          onClick={handleClick}
        >
          Start Playing
        </button>
        <button className="px-11 py-3 border border-[#E5CC7A] hover:bg-white/5 text-[#CFCFCF] font-bold rounded-full transition-all font-semibold hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] cursor-pointer hover:-translate-y-[2px] duration-800 hover:bg-[#E5CC7A4D]">
          Watch Demo
        </button>
      </div>
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </footer>
  );
};

export default Ready;

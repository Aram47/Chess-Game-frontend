import { useState } from "react";
import { PlayContext } from "../context/PlayContext";

export const PlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);


  return (
    <PlayContext.Provider value={{ gameState, setGameState, showModal,  setShowModal }}>
      {children}
    </PlayContext.Provider>
  );
};

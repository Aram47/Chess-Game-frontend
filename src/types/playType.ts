
export interface PlayContextType {
    showModal: string | null;
    setShowModal: (value: string | null) => void;
    gameState: string | null; 
    setGameState: (value: string | null) => void; 
}
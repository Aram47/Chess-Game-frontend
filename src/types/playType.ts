import type { GameStatus, MoveType, PlayerColor } from "./gameType";

export type GameLevel = "easy" | "medium" | "hard";
export type WinnerLabel = "you" | "bot" | "draw" | null;

export interface GameContextType {
  fen: string;
  gameStatus: GameStatus;
  playerColor: PlayerColor;
  isBotThinking: boolean;
  isPlayerTurn: boolean;
  lastMove: { from: string; to: string } | null;
  moveHistory: MoveType[];
  winner: WinnerLabel;
  level: GameLevel;
  setLevel: (l: GameLevel) => void;
  onDrop: (source: string, target: string) => Promise<boolean>;
  startNewGame: (color?: PlayerColor) => Promise<void>;
  resetGame: () => void;
  // Modal state you had before
  showModal: string | null;
  setShowModal: (val: string | null) => void;
}

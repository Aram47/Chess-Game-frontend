import type { SocketConnectionState } from "./gameType";
import type { BotLevel, GameStatus, MoveType, PlayerColor } from "./gameType";

export type GameLevel = "easy" | "medium" | "hard";
export type WinnerLabel = "you" | "bot" | "draw" | "opponent" | null;

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
  startNewGame: (level: BotLevel, color?: PlayerColor) => Promise<void>; // ← fixed
  resetGame: () => void;
  socketStatus: SocketConnectionState;
  showModal: string | null;
  setShowModal: (val: string | null) => void;
  isLiveGame: boolean;
  setIsLiveGame: (val: boolean) => void;
  startBotGame: (level: BotLevel, color?: PlayerColor) => Promise<void>;
  startLiveGame: (roomId: string, color: PlayerColor) => void;
  findMatch: () => void;
}

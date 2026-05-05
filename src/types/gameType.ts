import type { Dispatch, SetStateAction } from "react";

export type MoveType = {
  from: string;
  to: string;
  promotion?: string;
};

export type PlayerColor = "w" | "b";

/** Long-form color used by the API and socket layer */
export type ChessColor = "white" | "black";

/** Convenience alias — BotColor is always a ChessColor */
export type BotColor = ChessColor;

/** All possible chess winner values */
export type Winner = ChessColor | "draw";

// ─── Status & Reason ─────────────────────────────────────────────────────────

export type GameStatus =
  | "idle"
  | "waiting" // added: used when matchmaking
  | "playing"
  | "checkmate"
  | "stalemate"
  | "draw";

export type GameFinishReason = "checkmate" | "draw" | "leave";

/** Socket connection state (replaces ConnectionStatus from wsTypes) */
export type SocketConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export type BotLevel = "easy" | "medium" | "hard";

// ─── API Payloads ─────────────────────────────────────────────────────────────

export interface StartBotGamePayload {
  color: ChessColor;
  level: BotLevel;
}

export interface StartGameResponse {
  roomId: string;
  fen: string;
  color: ChessColor;
  level: BotLevel;
  botMove?: MoveType;
}

export interface MakeMoveResponse {
  fen: string;
  userMove: {
    from: string;
    to: string;
    promotion?: string;
    san?: string;
    color?: string;
    piece?: string;
  };
  botMove: {
    from: string;
    to: string;
    promotion?: string;
    san?: string;
    color?: string;
    piece?: string;
  };
}

export interface GameOverResponse {
  roomId: string;
  fen: string;
  isGameOver: boolean;
  finishedAt?: number;
  isCheckmate?: boolean;
  isDraw?: boolean;
  winner?: Winner;
  winnerId?: string;
  allMoves?: MoveType[];
  [key: string]: unknown;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
  error?: string;
}

// ─── History ──────────────────────────────────────────────────────────────────

export interface GameHistoryItem {
  _id: string;
  white: string;
  black: string;
  allMoves: (string | MoveType)[];
  fen: string;
  timestamp: string;
  winnerColor: Winner;
  winnerId?: string;
  isBot: boolean;
  finishedAt: number;
  setGames?: Dispatch<SetStateAction<GameHistoryItem[]>>;
}

/** Summary row shown in the game history list */
export interface GameSummary {
  opponentName?: string;
  elo?: number;
  mode?: string;
  result: "win" | "loss" | "draw";
  moves: number;
  time?: string;
}

/** Live sports-feed game entry (used by WSMessage event/snapshot) */
export interface LiveGame {
  id: string;
  home: { score: number };
  away: { score: number };
  minute: number;
}

// ─── Socket Constants ─────────────────────────────────────────────────────────

/**
 * Events the client sends to the server.
 * @see chess-game-monolit-backend/common/constants/socket-messages.constant.ts
 */
export const SOCKET_SUBSCRIBE_MESSAGE = {
  FIND_GAME: "find_game",
  MAKE_MOVE: "make_move",
} as const;

/**
 * Events the server emits to the client.
 * @see chess-game-monolit-backend/common/constants/socket-messages.constant.ts
 */
export const SOCKET_EMIT_MESSAGE = {
  MOVE_MADE: "move_made",
  GAME_STARTED: "game_started",
  GAME_RESUMED: "game_resumed",
  GAME_FINISHED: "game_finished",
  CREATING_ISSUE: "creating_issue",
  WAITING_FOR_OPONENT: "waiting_for_opponent",
} as const;

// ─── Socket Payloads ──────────────────────────────────────────────────────────

/** Sent by the client when making a move (replaces GameMakeMovePayload) */
export interface MakeMovePayload {
  roomId: string;
  move: MoveType;
}

/** Received when a live game begins */
export interface GameStartedPayload {
  fen: string;
  turn: ChessColor;
  roomId: string;
  white: string; // userId
  black: string; // userId
}

/** Received when the opponent makes a move */
export interface MoveMadePayload {
  color?: PlayerColor;
  move: MoveType;
}

/** Received when the game ends */
export interface GameFinishedPayload {
  winner: Winner;
  winnerId?: string;
  reason: GameFinishReason;
}

/** Received on reconnection to an in-progress game */
export interface GameResumedPayload {
  fen: string;
  turn: ChessColor;
  allMoves: MoveType[];
}

// ─── WebSocket Message Union ──────────────────────────────────────────────────

export type WSMessage =
  | { type: "init"; games: LiveGame[] }
  | { type: "snapshot"; games: LiveGame[] }
  | { type: "move"; move: MoveType; roomId: string }
  | {
      type: "event";
      gameId: string;
      score: { home: number; away: number };
      minute?: number;
    }
  | { type: "matched"; roomId: string; color: string }
  | { type: "gameOver"; winner: Winner; reason?: GameFinishReason }
  | { type: "pong"; timestamp: string };

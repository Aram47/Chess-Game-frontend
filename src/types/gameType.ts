export type MoveType = {
  from: string;
  to: string;
  promotion?: string;
};

export type BotColor = "white" | "black";
export type BotLevel = "easy" | "medium" | "hard";

export interface StartBotGamePayload {
  color: BotColor;
  level: BotLevel;
}

export interface StartGameResponse {
  roomId: string;
  fen: string;
  color: BotColor;
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
  winner?: "white" | "black" | "draw";
  winnerId?: string;
  allMoves?: MoveType[];
  [key: string]: any;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
  error?: string;
}

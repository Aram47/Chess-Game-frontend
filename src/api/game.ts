import type {
  StartBotGamePayload,
  StartGameResponse,
  ApiError,
  GameOverResponse,
  MakeMoveResponse,
  MoveType,
} from "../types/gameType";
import api from "./axiosIntance";

export async function startGameWithBot(
  payload: StartBotGamePayload,
): Promise<StartGameResponse> {
  try {
    const response = await api.post<StartGameResponse>("/game/start", payload);
    console.log('post', response.data)

    return response.data;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data;

    const errorMessage = Array.isArray(errorData?.message)
      ? errorData.message.join(", ")
      : errorData?.message ||
        `Failed to start game: ${error.response?.status || "Unknown error"}`;

    throw new Error(errorMessage);
  }
}

export async function makeMoveInGameWithBot(
  roomId: string,
  move: MoveType,
): Promise<MakeMoveResponse | GameOverResponse> {
  try {
    const response = await api.post<MakeMoveResponse | GameOverResponse>(
      `/game/move/${roomId}`,
      move,
    );

    return response.data;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data;

    const errorMessage = Array.isArray(errorData?.message)
      ? errorData.message.join(", ")
      : errorData?.message ||
        `Failed to make move: ${error.response?.status || "Unknown error"}`;

    throw new Error(errorMessage);
  }
}

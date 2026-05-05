import { useEffect, useRef, useState, useCallback } from "react";
import { Socket } from "socket.io-client";
import { getGameSocket, disconnectGameSocket } from "../lib/socket/game-socket";
import { refreshProvider } from "../api/auth";
import {
  SOCKET_SUBSCRIBE_MESSAGE,
  SOCKET_EMIT_MESSAGE,
} from "../types/gameType";
import type {
  GameStartedPayload,
  MoveMadePayload,
  GameFinishedPayload,
  GameResumedPayload,
  MakeMovePayload,
} from "../types/gameType";

export type SocketConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export interface UseGameSocketOptions {
  onWaitingForOpponent?: () => void;
  onGameStarted?: (payload: GameStartedPayload) => void;
  onMoveMade?: (payload: MoveMadePayload) => void;
  onGameFinished?: (payload: GameFinishedPayload) => void;
  onGameResumed?: (payload: GameResumedPayload) => void;
  onCreatingIssue?: () => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export interface UseGameSocketReturn {
  socket: Socket | null;
  connectionState: SocketConnectionState;
  isConnected: boolean;
  emitFindGame: () => void;
  emitMakeMove: (payload: MakeMovePayload) => void;
  disconnect: () => void;
}

export function useGameSocket(
  options: UseGameSocketOptions = {},
): UseGameSocketReturn {
  const [connectionState, setConnectionState] =
    useState<SocketConnectionState>("disconnected");
  const [socket, setSocket] = useState<Socket | null>(null);
  const optionsRef = useRef(options);
  const isRecoveringAuthRef = useRef(false);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    try {
      setConnectionState("connecting");
      socketInstance = getGameSocket();
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        setConnectionState("connected");
        console.log("Game socket connected...");
        optionsRef.current.onConnect?.();
      });

      socketInstance.on("disconnect", () => {
        setConnectionState("disconnected");
        optionsRef.current.onDisconnect?.();
      });

      socketInstance.on("connect_error", async (error: Error) => {
        const errorMessage = error?.message?.toLowerCase?.() ?? "";
        const isAuthError =
          errorMessage.includes("invalid token") ||
          errorMessage.includes("unauthorized") ||
          errorMessage.includes("jwt expired") ||
          errorMessage.includes("token");

        if (isAuthError && !isRecoveringAuthRef.current) {
          try {
            isRecoveringAuthRef.current = true;
            await refreshProvider();
            socketInstance?.connect();
            return;
          } catch (refreshError) {
            setConnectionState("error");
            optionsRef.current.onError?.(refreshError as Error);
            return;
          } finally {
            isRecoveringAuthRef.current = false;
          }
        }

        setConnectionState("error");
        optionsRef.current.onError?.(error);
      });

      socketInstance.on(SOCKET_EMIT_MESSAGE.WAITING_FOR_OPONENT, () => {
        optionsRef.current.onWaitingForOpponent?.();
      });

      socketInstance.on(
        SOCKET_EMIT_MESSAGE.GAME_STARTED,
        (payload: GameStartedPayload) => {
          optionsRef.current.onGameStarted?.(payload);
        },
      );

      socketInstance.on(
        SOCKET_EMIT_MESSAGE.MOVE_MADE,
        (payload: MoveMadePayload) => {
          optionsRef.current.onMoveMade?.(payload);
        },
      );

      socketInstance.on(
        SOCKET_EMIT_MESSAGE.GAME_FINISHED,
        (payload: GameFinishedPayload) => {
          optionsRef.current.onGameFinished?.(payload);
        },
      );

      socketInstance.on(
        SOCKET_EMIT_MESSAGE.GAME_RESUMED,
        (payload: GameResumedPayload) => {
          optionsRef.current.onGameResumed?.(payload);
        },
      );

      socketInstance.on(SOCKET_EMIT_MESSAGE.CREATING_ISSUE, () => {
        optionsRef.current.onCreatingIssue?.();
      });

      if (socketInstance.connected) {
        setConnectionState("connected");
      }
    } catch (error) {
      setConnectionState("error");
      optionsRef.current.onError?.(error as Error);
    }

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.off("connect");
        socketInstance.off("disconnect");
        socketInstance.off("connect_error");
        socketInstance.off(SOCKET_EMIT_MESSAGE.WAITING_FOR_OPONENT);
        socketInstance.off(SOCKET_EMIT_MESSAGE.GAME_STARTED);
        socketInstance.off(SOCKET_EMIT_MESSAGE.MOVE_MADE);
        socketInstance.off(SOCKET_EMIT_MESSAGE.GAME_FINISHED);
        socketInstance.off(SOCKET_EMIT_MESSAGE.GAME_RESUMED);
        socketInstance.off(SOCKET_EMIT_MESSAGE.CREATING_ISSUE);
      }
    };
  }, []);

  const emitFindGame = useCallback(() => {
    if (socket?.connected) {
      socket.emit(SOCKET_SUBSCRIBE_MESSAGE.FIND_GAME);
    }
  }, [socket]);

  const emitMakeMove = useCallback(
    (payload: MakeMovePayload) => {
      if (socket?.connected) {
        socket.emit(SOCKET_SUBSCRIBE_MESSAGE.MAKE_MOVE, payload);
      }
    },
    [socket],
  );

  const disconnect = useCallback(() => {
    disconnectGameSocket();
    setSocket(null);
    setConnectionState("disconnected");
  }, []);

  return {
    socket,
    connectionState,
    isConnected: connectionState === "connected",
    emitFindGame,
    emitMakeMove,
    disconnect,
  };
}

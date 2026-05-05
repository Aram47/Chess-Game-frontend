import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../../api/axiosIntance";

// ✅ Always points at the backend directly.
//    API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000"
//
// ❌ Do NOT use a relative URL ("/notifications") — Socket.IO resolves it
//    against the current page origin (localhost:5173 in dev), which is the
//    Vite dev server. Vite cannot handle WebSocket upgrades for Socket.IO,
//    so it immediately closes the connection.
const SOCKET_BASE_URL = (
  import.meta.env.VITE_SOCKET_BASE_URL || API_BASE_URL
).replace(/\/$/, "");

let socketInstance: Socket | null = null;

export function getGameSocket(): Socket {
  if (socketInstance) {
    return socketInstance;
  }

  const socketUrl = `${SOCKET_BASE_URL}/notifications`;
  console.log(
    "[socket] Attempting connection to:",
    socketUrl,
    "with path:",
    "/notification/socket.io",
  );
  socketInstance = io(socketUrl, {
    path: "/notification/socket.io",
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socketInstance.on("connect_error", (err) => {
    console.error("[socket] Connection error details:", err.message);
  });

  return socketInstance;
}

export function disconnectGameSocket(): void {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

export function isSocketConnected(): boolean {
  console.log("Checking socket connection status:", socketInstance?.connected);
  return socketInstance?.connected ?? false;
}

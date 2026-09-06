/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_PATH?: string;
  readonly VITE_GAME_PATH?: string;
  readonly VITE_OWNER_SERVICE_PATH?: string;
  readonly VITE_SNAPSHOT_SERVICE_PATH?: string;
  readonly VITE_USER_SERVICE_PATH?: string;
  readonly VITE_NOTIFICATIONS_PATH?: string;
  readonly VITE_SOCKET_BASE_URL?: string;
  readonly VITE_NOTIFICATIONS_SSE_URL?: string;
  readonly VITE_NOTIFICATIONS_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

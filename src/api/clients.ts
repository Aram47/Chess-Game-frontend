import { API_BASE_URL } from "./baseUrl";

const API_PATH = import.meta.env.VITE_API_PATH || "/api";
const GAME_PATH = import.meta.env.VITE_GAME_PATH || "/game";
const OWNER_SERVICE_PATH =
  import.meta.env.VITE_OWNER_SERVICE_PATH || "/owner-service";
const SNAPSHOT_SERVICE_PATH =
  import.meta.env.VITE_SNAPSHOT_SERVICE_PATH || "/snapshot-service";
const USER_SERVICE_PATH =
  import.meta.env.VITE_USER_SERVICE_PATH || "/user-service";
const NOTIFICATIONS_PATH =
  import.meta.env.VITE_NOTIFICATIONS_PATH || "/notifications";

function getServicePathAndCleanPath(path: string): {
  servicePath: string;
  endpointPath: string;
} {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (cleanPath.startsWith("owner-service/")) {
    const endpointPath = cleanPath.replace(/^owner-service\//, "");
    return { servicePath: OWNER_SERVICE_PATH, endpointPath };
  }

  if (cleanPath.startsWith("game/")) {
    const endpointPath = cleanPath.replace(/^game\//, "");
    return { servicePath: GAME_PATH, endpointPath };
  }

  if (cleanPath.startsWith("snapshot-service/")) {
    const endpointPath = cleanPath.replace(/^snapshot-service\//, "");
    return { servicePath: SNAPSHOT_SERVICE_PATH, endpointPath };
  }

  if (cleanPath.startsWith("user-service/")) {
    const endpointPath = cleanPath.replace(/^user-service\//, "");
    return { servicePath: USER_SERVICE_PATH, endpointPath };
  }

  if (cleanPath.startsWith("notifications/")) {
    const endpointPath = cleanPath.replace(/^notifications\//, "");
    return { servicePath: NOTIFICATIONS_PATH, endpointPath };
  }

  if (cleanPath.startsWith("problems")) {
    return { servicePath: GAME_PATH, endpointPath: cleanPath };
  }

  return { servicePath: API_PATH, endpointPath: cleanPath };
}


export function getApiUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const { servicePath, endpointPath } = getServicePathAndCleanPath(path);

  const cleanServicePath = servicePath.startsWith("/")
    ? servicePath
    : `/${servicePath}`;
  const finalServicePath = cleanServicePath.endsWith("/")
    ? cleanServicePath.slice(0, -1)
    : cleanServicePath;

  const relativeUrl = `${finalServicePath}/${endpointPath}`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );

  return API_BASE_URL ? `${API_BASE_URL}${relativeUrl}` : relativeUrl;
}

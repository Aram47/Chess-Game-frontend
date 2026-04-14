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

export const API_BASE_URL = import.meta.env.DEV
  ? "" // Use relative URLs in dev to leverage Vite proxy
  : import.meta.env.VITE_API_BASE_URL || "";

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

  if (import.meta.env.DEV) {
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
    return relativeUrl;
  }

  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  if (!baseUrl) {
    console.error(
      "API_BASE_URL is not configured. Please set VITE_API_BASE_URL in your .env file",
    );
    throw new Error("API base URL is not configured");
  }

  const { servicePath, endpointPath } = getServicePathAndCleanPath(path);

  const cleanServicePath = servicePath.startsWith("/")
    ? servicePath
    : `/${servicePath}`;
  const finalServicePath = cleanServicePath.endsWith("/")
    ? cleanServicePath.slice(0, -1)
    : cleanServicePath;

  const fullUrl = `${baseUrl}${finalServicePath}/${endpointPath}`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );

  return fullUrl;
}

import { defineConfig, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const backendTarget =
  process.env.VITE_APP_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

function proxyWithDevCookies(context: string): ProxyOptions {
  return {
    target: backendTarget,
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "",
    cookiePathRewrite: "/",
    configure: (proxy) => {
      proxy.on("proxyRes", (proxyRes) => {
        const setCookie = proxyRes.headers["set-cookie"];
        if (!setCookie) return;

        proxyRes.headers["set-cookie"] = (
          Array.isArray(setCookie) ? setCookie : [setCookie]
        ).map((cookie) => cookie.replace(/;\s*[Ss]ecure/gi, ""));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": proxyWithDevCookies("/api"),
      "/game": proxyWithDevCookies("/game"),
      "/user-service": proxyWithDevCookies("/user-service"),
      "/snapshot-service": proxyWithDevCookies("/snapshot-service"),
      "/owner-service": proxyWithDevCookies("/owner-service"),
      "/notifications": proxyWithDevCookies("/notifications"),
      /** API GET /achievements + static /achievements-icons/* */
      "/achievements": proxyWithDevCookies("/achievements"),
      "/notification": {
        ...proxyWithDevCookies("/notification"),
        ws: true,
      },
      "/socket.io": {
        target: backendTarget,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});

# Vite 8 requires Node 20.19+ or 22.12+
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Leave API origin empty so the browser talks to the same public host
# that backend nginx serves (Dokploy). Set VITE_APP_API_URL only if the
# API is on a different public origin.
ARG VITE_APP_API_URL=
ARG VITE_API_PATH=/api
ARG VITE_GAME_PATH=/game
ARG VITE_OWNER_SERVICE_PATH=/owner-service

ENV VITE_APP_API_URL=$VITE_APP_API_URL \
    VITE_API_PATH=$VITE_API_PATH \
    VITE_GAME_PATH=$VITE_GAME_PATH \
    VITE_OWNER_SERVICE_PATH=$VITE_OWNER_SERVICE_PATH

RUN npm run build:prod

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache wget

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]

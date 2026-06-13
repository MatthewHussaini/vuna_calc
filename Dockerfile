# ── Stage 1: Build & Test ──────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer-cached if package.json unchanged)
COPY package*.json ./
RUN npm ci

# Copy source and run quality gates + build
COPY . .
RUN npm run lint && npm test && npm run build

# ── Stage 2: Production image (nginx serves the static files) ───────────────
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

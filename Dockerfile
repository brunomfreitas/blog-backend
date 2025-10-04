FROM node:22.18.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-fund --no-audit

COPY . .
# ⚠️ NÃO rode `npm rebuild esbuild` aqui
RUN npm run build

FROM node:22.18.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev --no-fund --no-audit

COPY --from=builder /app/dist ./dist

RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:${PORT}/healthz || exit 1

EXPOSE 3000
CMD ["node", "dist/server.js"]

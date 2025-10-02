# -------- BUILDER: instala dependências + compila TypeScript --------
FROM node:22.18.0-alpine AS builder
WORKDIR /app

# Dependências
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# (Opcional) ferramentas úteis p/ debug na fase builder
# RUN apk add --no-cache bash curl nano

# Compila TS -> dist/
RUN npm run build

# -------- RUNNER: imagem final, só o necessário p/ rodar --------
FROM node:22.18.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Só dependências de runtime (omit dev)
COPY package*.json ./
RUN npm ci --omit=dev

# Copia build pronto
COPY --from=builder /app/dist ./dist

# Se você tiver arquivos estáticos (ex: swagger.json) servidos pelo app:
# COPY --from=builder /app/http/docs ./dist/http/docs

# (Opcional) healthcheck simplificado: tenta bater no /healthz
# Necessita "wget" (bem leve) ou "curl"
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:${PORT}/healthz || exit 1

EXPOSE 3000
CMD ["node", "dist/server.js"]

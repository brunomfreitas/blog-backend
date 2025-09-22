# -------- 1) BUILDER: instala TUDO, gera Prisma Client e builda --------
FROM node:22.18.0-alpine
WORKDIR /app

# Instala as dependências (inclui dev)
COPY package*.json ./
RUN npm install

COPY . .

# Remove devDependencies para reduzir o que vai pro runner
RUN npm prune --omit=dev

EXPOSE 3030

CMD ["node", "/app/src/app.js"]
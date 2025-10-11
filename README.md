# Projeto Blog API — Guia de Execução, Testes e Swagger

> **Objetivo:** este README descreve **passo a passo** como clonar, configurar, executar os **testes**, subir o projeto com **Docker Compose** e acessar a documentação **Swagger** em `http://localhost:3000/swagger/`.

---

## 📦 Stack (resumo)

* **Node.js + Express** (API REST)
* **TypeORM** (ORM)
* **PostgreSQL** (banco de dados)
* **Jest + Supertest** (testes)
* **Docker e Docker Compose** (containerização)
* **Swagger** (documentação da API)

---

## ✅ Pré‑requisitos

* **Git** instalado
* **Docker** e **Docker Compose** instalados
* **Node.js** LTS (para rodar os testes localmente fora do container)

> Dica: se estiver no Windows sem WSL, prefira rodar tudo via Docker para evitar problemas de ambiente.

---

## ⬇️ 1) Clonar o repositório

```bash
# Via HTTPS
git clone <URL_DO_REPO>.git
cd <PASTA_DO_REPO>
```

---

## 🔐 2) Configurar variáveis de ambiente

Crie um arquivo **`.env`** na raiz do projeto com as variáveis abaixo (ajuste se já possuir outro padrão no projeto):

```env
# App
NODE_ENV=development
APP_PORT=3000
JWT_SECRET=change-me

# Banco
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_NAME=blog
DATABASE_USER=blog_user
DATABASE_PASSWORD=blog_password
```

> Observações:
>
> * **APP_PORT 3000** é onde a API vai subir. Deixe livre.
> * O host do banco **dentro do Docker** é `blog-postgres` (nome do serviço no compose).
> * Se você já tem um `.env.example`, pode copiar: `cp .env.example .env` e ajustar.

---

## 🐳 3) Subir com Docker Compose (produção/DEV local simples)

> Este fluxo é o **mais fácil** para quem quer apenas subir e testar a API.

```bash
# Subir em segundo plano
docker compose up -d --build

# Verificar status
docker compose ps

# (opcional) Acompanhar logs do app
docker compose logs -f app
```

### 3.1) Testar a API rodando

* **Swagger:** `http://localhost:3000/swagger/`

Se a página do Swagger abrir, a API está OK.

### 3.2) Parar e limpar

```bash
# Parar containers (mantém volumes)
docker compose down

# Parar e apagar volumes (APAGA o banco)
docker compose down -v
```

---

## 🧪 4) Rodar testes (Jest + Supertest)

### 4.1) Rodar testes localmente (fora do Docker)

> Útil para desenvolvimento. Requer Node.js instalado.

1. Garanta dependências:

   ```bash
   npm install
   ```
2. Executar testes:

   ```bash
   npm run test
   # ou
   npm run test:watch   
   ```
---

## 🧭 5) Ordem recomendada (do zero ao Swagger)

1. **Clonar** o repositório.
2. Criar **`.env`** com as variáveis acima.
3. Rodar `docker compose up -d --build`.
4. Acessar **Swagger**: `http://localhost:3000/swagger/`.

---

## 🧰 Scripts NPM úteis

```bash
# iniciar em dev (fora do Docker)
npm run dev

# build de produção
npm run build

# iniciar app compilado
npm start

# testes
npm test
npm run test:watch
npm run test:coverage
```

---

## 🌐 Endpoints e Swagger

* URL base local: `http://localhost:3000`
* Documentação: **`http://localhost:3000/swagger/`**

> Use o Swagger para explorar endpoints, enviar requests e validar respostas.

---

## 🐘 Banco de dados (local)

* Dentro do Docker, o serviço do banco se chama **`blog-postgres`**.
* Para conectar via **DBeaver** localmente (opcional):

  * Host: `localhost`
  * Porta: `5433`
  * Database: `blog`
  * User: `blog_user`
  * Password: `blog_password`

> Verifique o `docker-compose.yml` do projeto para confirmar as portas/credenciais mapeadas.

---
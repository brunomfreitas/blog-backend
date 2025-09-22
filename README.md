### ############### ###
### Projeto BackEnd ###
### ############### ###

# Estrutura de pasta:
domain
   | --> entities
   | --> enums
   | --> interfaces

http
   | --> controllers
   | --> middlewares

lib
   | --> typeorm

repositories
   | --> typeorm

use-case

# Bibliotecas:
	TypeOrm
	Express
	zod
	postgres


# P1 - Para criar um projeto do Zero
npm init -y

npm install express

npm i -D @types/node tsup tsx typescript

npx tsc --init

npm i dotenv zod



# TypeORM
https://typeorm.io/docs/getting-started

npm install typeorm
npm install reflect-metadata
npm install pg

npx typeorm init --name blog --database postgres



# P2 - Preparar ambiente docker
> Rede
docker network create --driver bridge blog-network

> Volume para o banco de dados
docker volume create blogpgdata

# P3 - Criar conteiner a partir da imagem cognitio-postgres
docker run -d --name blog-pg --network blog-network -e POSTGRES_USER="admin" -e POSTGRES_PASSWORD="blog" -e POSTGRES_DB="blog" -v blogpgdata:/var/lib/postgresql/data -p 5433:5432 cognitio-postgres:17

# P4 - Configuração do banco de dados

1. Criar o schema (se ainda não criou):
CREATE SCHEMA blog;

2. Criar um usuário para a aplicação:
CREATE USER blog_user WITH PASSWORD 'blog_user';

3. Dar permissão para esse usuário acessar o schema:
GRANT USAGE ON SCHEMA blog TO blog_user;

4. Dar permissão para criar/usar tabelas no schema:
GRANT CREATE ON SCHEMA blog TO blog_user;

5. Garantir acesso às tabelas futuras:
ALTER DEFAULT PRIVILEGES IN SCHEMA blog
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO blog_user;

6. Caso já existam tabelas no schema, conceder acesso nelas:
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA blog TO blog_user;





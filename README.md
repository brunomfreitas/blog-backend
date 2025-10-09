# 📰 Blog Backend

API backend desenvolvida em **Node.js (TypeScript)** com **Express**, **TypeORM**, **PostgreSQL** e **Swagger** para documentação.  
O projeto implementa princípios de **Clean Architecture** e **SOLID**, separando responsabilidades em camadas bem definidas.

---

## 🚀 Tecnologias Principais

- **Node.js** + **TypeScript**
- **Express** — Servidor HTTP
- **TypeORM** — ORM para PostgreSQL
- **Zod** — Validação de dados
- **Swagger UI + swagger-jsdoc** — Documentação automática da API
- **JWT (jsonwebtoken)** — Autenticação
- **bcryptjs** — Criptografia de senhas
- **Docker + Docker Compose** — Ambiente de execução isolado

---

## 🏗️ Arquitetura e Estrutura de Pastas

src/
├── domain/
|	├── entities/ # Entidades de domínio (User, Post, etc)
│ 	├── enums/ # Enumerações globais
│ 	└── interfaces/ # Contratos e tipos
│
├── http/
│ 	├── controllers/ # Controladores Express (rotas e handlers)
│ 	└── middlewares/ # Middlewares globais (auth, error handler, etc)
│
├── lib/
│ 	├── auth/ # Configuração do JWT
│ 	├── typeorm/ # Configuração do TypeORM e DataSource
│ 	└── swagger/ # Setup do Swagger e geração de JSON
│ 			├── docs/ # Schemas OpenAPI (Swagger)
│ 			└── paths/ # Serviços OpenAPI (Swagger)
│
├── repositories/
│ 	└── typeorm/ # Repositórios que acessam o banco via TypeORM
│
├── use-case/ # Casos de uso (regras de negócio)
|
├── utils/ # Códigos comuns em toda a aplicação
│
└── server.ts # Ponto de entrada da aplicação

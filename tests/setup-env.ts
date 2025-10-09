// tests/setup-env.ts
import 'dotenv/config';

process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Ajuste os valores conforme seu ambiente local de testes:
process.env.DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
process.env.DATABASE_PORT = process.env.DATABASE_PORT || '5433';
process.env.DATABASE_USER = process.env.DATABASE_USER || 'blog_user';
process.env.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'blog_password';
process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'blog';
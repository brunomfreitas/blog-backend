// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // onde estão seus testes .test.ts / .spec.ts
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test|spec).ts'],

  // resolver o alias "@/..."
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // carregar variáveis e defaults para o ambiente de teste
  setupFiles: ['<rootDir>/tests/setup-env.ts'],

  clearMocks: true,

  // executa os testes em série (evita briga de conexão TypeORM)
  // Dica: deixe o flag também no script "test" do package.json
  // mas colocar aqui ajuda quando chamar "jest" direto
  maxWorkers: 1,
};

export default config;

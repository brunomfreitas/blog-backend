import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // considera testes ao lado do código
  testMatch: ['**/?(*.)+(spec|test).ts'],
  // se você usa alias @/ para src/
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // melhora stacktrace
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  // caso queira rodar algo antes dos testes (ex.: dotenv/config)
  setupFiles: ['dotenv/config'],
  // aumenta o timeout se tiver testes de integração mais lentos
  testTimeout: 30000,
  // útil se usar import/export e libs ESM
  // extensionsToTreatAsEsm: ['.ts'],
};
export default config;

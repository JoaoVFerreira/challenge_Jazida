// jest.config.js
module.exports = {
  roots: ["<rootDir>/__tests__"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\$app/(.*)": "<rootDir>/src/app/$1",
    "\\$models/(.*)": "<rootDir>/src/models/$1",
    "\\$test/(.*)": "<rootDir>/__tests__/$1",
    "\\$errors/(.*)": "<rootDir>/src/errors/$1",
    "\\$shared/(.*)": "<rootDir>/src/shared/$1",
    "\\$modules/(.*)": "<rootDir>/src/modules/$1",
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/jest.setup.ts",
    "<rootDir>/__tests__/unit/modules/pokemons/inMemory/PokemonsRepositoryInMemory.ts",
    "<rootDir>/__tests__/utils/db/TruncateDB.ts",
    "<rootDir>/__tests__/utils/factory/PokemonFactory"
  ]
};
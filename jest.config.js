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
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts']
};
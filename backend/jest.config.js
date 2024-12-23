// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json', 'text', 'lcov'],
  globalSetup: path.join(__dirname, 'test', 'globalSetup.ts'),
  moduleDirectories: ['<rootDir>', 'src', 'node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  setupFilesAfterEnv: [path.join(__dirname, 'test', 'setupTests.ts')],
  testRegex: [
    '/src/.*\\.(db-test|db-spec).(ts|tsx|js)$',
    '/src/.*\\.(test|spec).(ts|tsx|js)$',
    '/tests/.*\\.(test|spec).(ts|tsx|js)$',
  ],
  transform: { '^.+\\.ts?$': 'ts-jest' },
};

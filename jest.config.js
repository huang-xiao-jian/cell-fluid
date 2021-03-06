module.exports = {
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.spec.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/'],
};

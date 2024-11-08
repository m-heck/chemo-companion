module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!@fortawesome)',
      '/node_modules/(?!axios)/',
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
      }
    };
const config = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/apps/api/src/',
    '^@libs/(.*)$': '<rootDir>/libs/',
  },
  collectCoverageFrom: ['apps/**/*.ts', 'libs/**/*.ts'],
  coverageDirectory: './coverage',
};

module.exports = config;

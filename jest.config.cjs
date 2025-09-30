const config = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/apps/api/src/$1',
    '^@modules/(.*)$': '<rootDir>/apps/api/src/modules/$1',
    '^@infrastructure/(.*)$': '<rootDir>/apps/api/src/infrastructure/$1',
    '^@shared/(.*)$': '<rootDir>/apps/api/src/shared/$1',
    '^@libs/(.*)$': '<rootDir>/libs/$1',
  },
  collectCoverageFrom: ['apps/**/*.ts', 'libs/**/*.ts'],
  coverageDirectory: './coverage',
};

module.exports = config;

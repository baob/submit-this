const pack = require('./package');

// See https://jestjs.io/docs/en/configuration

module.exports = {
    displayName: `${pack.name}:test`,
    name: pack.name,
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageThreshold: {
        global: {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0,
        },
    },
    coverageReporters: ['lcov', 'text-summary'],
    collectCoverageFrom: ['**/*.js'],
};

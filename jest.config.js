const pack = require('./package');

// See https://jestjs.io/docs/en/configuration

module.exports = {
    displayName: `${pack.name}:test`,
    name: pack.name,
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
};

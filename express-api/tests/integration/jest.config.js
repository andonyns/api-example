const mongoPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = {
    displayName: 'Integration Tests',
    ...mongoPreset,
    watchPathIgnorePatterns: ['globalConfig'], // jest-mongodb setup
    testMatch: ['<rootDir>/**/integration/**/*.(spec|test).[jt]s?(x)'],
    rootDir: '../../../..',
  }
  
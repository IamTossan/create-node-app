const { testEnum } = require('../shared/enums');

const basePackages = ['typescript', 'ts-node-dev'];

const lintPackages = [
  'tslint',
  'prettier',
  'tslint-config-airbnb',
  'tslint-config-prettier',
];

const testPackages = {
  [testEnum.NONE]: [],
  [testEnum.MOCHA]: [
    'mocha',
    'chai',
    'ts-node',
    'nyc',
    '@types/mocha',
    '@types/chai',
    'source-map-support',
  ],
  [testEnum.JEST]: [
    'jest',
    '@types/jest',
    'ts-jest',
  ],
}

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

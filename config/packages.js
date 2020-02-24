const { testEnum } = require('../shared/enums');

const basePackages = ['typescript', 'ts-node-dev'];

const lintPackages = [
  'eslint',
  'prettier',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-airbnb-typescript',
  'eslint-config-prettier',
  'eslint-plugin-import',
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
  [testEnum.JEST]: ['jest', '@types/jest', 'ts-jest', 'eslint-plugin-jest'],
};

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

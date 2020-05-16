const { testEnum } = require('../shared/enums');

const basePackages = [
  'typescript@3.9.2',
  'ts-node-dev@1.0.0-pre.44'
];

const lintPackages = [
  'eslint@7.0.0',
  'prettier@2.0.5',
  '@typescript-eslint/eslint-plugin@2.33.0',
  '@typescript-eslint/parser@2.33.0',
  'eslint-config-airbnb-typescript',
  'eslint-config-prettier@6.11.0',
  'eslint-plugin-import@2.20.2',
];

const testPackages = {
  [testEnum.NONE]: [],
  [testEnum.JEST]: [
    'jest@26.0.1',
    '@types/jest@25.2.2',
    'ts-jest@26.0.0',
    'eslint-plugin-jest@23.13.0'
  ],
};

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

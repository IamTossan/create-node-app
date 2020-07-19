const { testEnum } = require('../shared/enums');

const basePackages = [
  'typescript@3.9.7',
  'ts-node-dev@1.0.0-pre.52'
];

const lintPackages = [
  'eslint@7.5.0',
  'prettier@2.0.5',
  '@typescript-eslint/eslint-plugin@2.34.0',
  '@typescript-eslint/parser@2.34.0',
  'eslint-config-airbnb-typescript@9.0.0',
  'eslint-config-prettier@6.11.0',
  'eslint-plugin-import@2.22.0',
];

const testPackages = {
  [testEnum.NONE]: [],
  [testEnum.JEST]: [
    'jest@26.1.0',
    '@types/jest@26.0.5',
    'ts-jest@26.1.3',
    'eslint-plugin-jest@23.18.0'
  ],
};

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

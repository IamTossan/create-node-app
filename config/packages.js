const basePackages = [
  'typescript@4.1.3',
  'ts-node-dev@1.1.1',
  '@types/node@14.14.22',
];

const lintPackages = [
  'eslint@7.19.0',
  'prettier@2.2.1',
  '@typescript-eslint/eslint-plugin@4.14.1',
  '@typescript-eslint/parser@4.14.1',
  'eslint-config-airbnb-typescript@12.0.0',
  'eslint-config-prettier@7.2.0',
  'eslint-plugin-import@2.22.1',
];

const testPackages = [
  'jest@26.6.3',
  '@types/jest@26.0.20',
  'ts-jest@26.5.0',
  'eslint-plugin-jest@24.1.3',
];

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

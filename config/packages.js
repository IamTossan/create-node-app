const basePackages = [
  'typescript@4.0.3',
  'ts-node-dev@1.0.0',
  '@types/node@14.14.3',
];

const lintPackages = [
  'eslint@7.12.0',
  'prettier@2.1.2',
  '@typescript-eslint/eslint-plugin@4.5.0',
  '@typescript-eslint/parser@4.5.0',
  'eslint-config-airbnb-typescript@12.0.0',
  'eslint-config-prettier@6.14.0',
  'eslint-plugin-import@2.22.1',
];

const testPackages = [
  'jest@26.6.1',
  '@types/jest@26.0.15',
  'ts-jest@26.4.2',
  'eslint-plugin-jest@24.1.0',
];

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

const basePackages = [
  'typescript@4.6.3',
  'ts-node-dev@1.1.8',
  '@types/node@14.14.22',
];

const lintPackages = [
  'eslint@8.12.0',
  'prettier@2.6.1',
  '@typescript-eslint/eslint-plugin@5.16.0',
  '@typescript-eslint/parser@5.16.0',
  'eslint-config-airbnb-typescript@16.1.4',
  'eslint-config-prettier@8.5.0',
  'eslint-plugin-import@2.25.4',
];

const testPackages = [
  'jest@27.5.1',
  '@types/jest@27.4.1',
  'ts-jest@27.1.4',
  'eslint-plugin-jest@26.1.3',
];

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

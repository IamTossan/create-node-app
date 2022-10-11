const basePackages = [
  'typescript@4.8.4',
  'ts-node-dev@2.0.0',
  '@types/node@16.11.65',
];

const lintPackages = [
  'eslint@8.25.0',
  'prettier@2.7.1',
  '@typescript-eslint/eslint-plugin@5.40.0',
  '@typescript-eslint/parser@5.40.0',
  'eslint-config-airbnb-typescript@17.0.0',
  'eslint-config-prettier@8.5.0',
  'eslint-plugin-import@2.26.0',
];

const testPackages = [
  'jest@29.1.2',
  '@types/jest@29.1.2',
  'ts-jest@29.0.3',
  'eslint-plugin-jest@27.1.1',
];

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

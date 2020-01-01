const basePackages = ['typescript', 'ts-node-dev'];

const lintPackages = [
  'tslint',
  'prettier',
  'tslint-config-airbnb',
  'tslint-config-prettier',
];

const testPackages = [
  'mocha',
  'chai',
  'ts-node',
  'nyc',
  '@types/mocha',
  '@types/chai',
  'source-map-support',
];

module.exports = {
  basePackages,
  lintPackages,
  testPackages,
};

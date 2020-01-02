const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const commandExists = require('command-exists');

const {
  basePackages,
  lintPackages,
  testPackages,
} = require('../config/packages');

const { cwd, chdir, argv } = process;

const makeManifestoScripts = projectOpts => {
  const { hasLint, hasTest } = projectOpts;
  return {
    build: 'tsc',
    start: 'npm run build && node ./dist/index.js',
    dev: 'ts-node-dev --respawn --transpileOnly ./src/index.ts',
    ...(hasLint
      ? {
        tslint: 'tslint --project tsconfig.json',
        prettier: 'prettier --parser typescript --write "src/**/*.ts"',
      }
      : {}),
    ...(hasTest
      ? {
        test: 'mocha -r ts-node/register src/**/*.spec.ts',
        'test-watch': 'npm run test -- --watch --watch-extensions ts',
        'test-cov': 'nyc npm run test',
      }
      : {}),
  };
};

const updateManifesto = (projectOpts, projectPath) => {
  const manifestoPath = path.resolve(projectPath, 'package.json');
  const manifesto = require(manifestoPath);
  manifesto.scripts = makeManifestoScripts(projectOpts);
  fs.writeFileSync(manifestoPath, JSON.stringify(manifesto, null, 2));
};

const createProject = projectPath => {
  spawn.sync('npm', ['init', '-y'], { stdio: 'inherit' });
  fs.mkdirSync(path.resolve(projectPath, 'src'));
  spawn.sync('touch', ['src/index.ts']);

  const files = ['tsconfig.json'];

  if (commandExists('git')) {
    spawn.sync('git', ['init'], { stdio: 'inherit' });
    files.push('.gitignore')
  }

  const configPath = path.resolve(
    argv[1].split('/bin/index.js')[0],
    'config/base',
  );

  files.forEach(file => {
    fs.copyFileSync(path.resolve(configPath, file), file);
  });
};

const setLint = projectPath => {
  const files = ['.prettierrc', 'tslint.json'];
  const configPath = path.resolve(
    argv[1].split('/bin/index.js')[0],
    'config/lint',
  );

  files.forEach(file => {
    fs.copyFileSync(path.resolve(configPath, file), file);
  });
};

const setTest = projectPath => {
  const manifestoPath = path.resolve(projectPath, 'package.json');
  const manifesto = require(manifestoPath);
  manifesto.nyc = require('../config/test/nycConfig.json');
  fs.writeFileSync(manifestoPath, JSON.stringify(manifesto, null, 2));
};

const addDependencies = projectOpts => {
  const { hasLint, hasTest } = projectOpts;
  const packages = [
    ...basePackages,
    ...(hasLint ? lintPackages : []),
    ...(hasTest ? testPackages : []),
  ];
  spawn.sync('npm', ['i', '-D', ...packages], { stdio: 'inherit' });
};

const buildProject = projectOpts => {
  console.log(projectOpts);
  const { name, hasLint, hasTest } = projectOpts;

  const projectPath = path.resolve(cwd(), name);
  fs.mkdirSync(projectPath);
  chdir(projectPath);

  createProject(projectPath);
  addDependencies(projectOpts);
  if (hasLint) {
    setLint(projectPath);
  }
  if (hasTest) {
    setTest(projectPath);
  }
  updateManifesto(projectOpts, projectPath);
};

module.exports = {
  buildProject,
};

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

const basePath = () => {
  const executePath = fs.realpathSync(argv[1]);
  return executePath.split('/bin/index.js')[0];
};

const makeManifestoScripts = projectOpts => {
  const { lint, test } = projectOpts;
  return {
    build: 'tsc',
    start: 'npm run build && node ./dist/index.js',
    dev: 'ts-node-dev --respawn --transpile-only ./src/index.ts',
    ...(lint
      ? {
        lint: 'eslint src/',
        prettier: 'prettier --parser typescript --write "src/**/*.ts"',
      }
      : {}),
    ...(test
      ? {
        test: 'jest',
        'test-watch': 'jest --watch',
        'test-cov': 'jest --coverage',
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

  const files = ['tsconfig.json', 'src/index.ts'];
  const configPath = path.resolve(basePath(), 'config/base');

  files.forEach(file => {
    fs.copyFileSync(
      path.resolve(configPath, file),
      path.resolve(projectPath, file),
    );
  });
};

const setLint = projectPath => {
  const files = ['.prettierrc', '.eslintrc.json', '.eslintignore'];
  const configPath = path.resolve(basePath(), 'config/lint');

  files.forEach(file => {
    fs.copyFileSync(
      path.resolve(configPath, file),
      path.resolve(projectPath, file),
    );
  });
};

const setGit = projectPath => {
  const configPath = path.resolve(basePath(), 'config/base');

  if (commandExists('git')) {
    spawn.sync('git', ['init'], { stdio: 'inherit' });
    fs.copyFileSync(
      path.resolve(configPath, 'gitignore'),
      path.resolve(projectPath, '.gitignore'),
    );
  }
};

const setTest = projectPath => {
  const manifestoPath = path.resolve(projectPath, 'package.json');
  const manifesto = require(manifestoPath);
  manifesto.jest = require('../config/test/jest.json');
  fs.writeFileSync(manifestoPath, JSON.stringify(manifesto, null, 2));

  const eslintrcPath = path.resolve(projectPath, '.eslintrc.json');
  const eslintrc = require(eslintrcPath);
  eslintrc.plugins.push('jest');
  eslintrc.extends.push('plugin:jest/recommended');
  fs.writeFileSync(eslintrcPath, JSON.stringify(eslintrc, null, 2));

  const files = ['src/index.spec.ts'];
  const configPath = path.resolve(basePath(), 'config/base');
  files.forEach(file => {
    fs.copyFileSync(
      path.resolve(configPath, file),
      path.resolve(projectPath, file),
    );
  });
};

const addDependencies = projectOpts => {
  const { lint, test } = projectOpts;
  const packages = [
    ...basePackages,
    ...(lint ? lintPackages : []),
    ...(test ? testPackages : []),
  ];
  spawn.sync('npm', ['i', '-D', ...packages], { stdio: 'inherit' });
};

const buildProject = projectOpts => {
  const { name, lint, test, git } = projectOpts;

  const projectPath = path.resolve(cwd(), name);
  fs.mkdirSync(projectPath);
  chdir(projectPath);

  createProject(projectPath);
  addDependencies(projectOpts);
  if (git) {
    setGit(projectPath);
  }
  if (lint) {
    setLint(projectPath);
  }
  if (test) {
    setTest(projectPath);
  }
  updateManifesto(projectOpts, projectPath);
};

module.exports = {
  buildProject,
};

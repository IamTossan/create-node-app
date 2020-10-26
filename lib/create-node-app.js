const yargs = require('yargs/yargs');
const inquirer = require('inquirer');

const { questions } = require('./questions');
const { buildProject } = require('./project-builder');

const argv = yargs(process.argv.slice(2))
  .alias('n', 'name')
  .string('name')
  .boolean('git')
  .default('git', true)
  .boolean('lint')
  .default('lint', true)
  .boolean('test')
  .default('test', true)
  .argv;

if (argv.name) {
  const { name, git, lint, test } = argv;
  buildProject({ name, git, lint, test });
  process.exit(0);
}

inquirer
  .prompt(questions)
  .then(answers => {
    buildProject(answers);
  })
  .catch(err => console.log(err));

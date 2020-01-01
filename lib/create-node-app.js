const inquirer = require('inquirer');

const { projectOpts, questions } = require('./questions');
const { buildProject } = require('./project-builder');

inquirer
  .prompt(questions)
  .then(answers => {
    buildProject({
      ...projectOpts,
      ...answers,
    });
  })
  .catch(err => console.log(err));

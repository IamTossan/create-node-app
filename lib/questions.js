const fs = require('fs');
const path = require('path');
const { argv, cwd } = process;

const projectOpts = {};
const questions = [];

if (argv.length === 2) {
  questions.push({
    type: 'input',
    name: 'name',
    message: "What's the project name ?",
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!/^[a-zA-Z\-\._]+$/.test(input)) {
          resolve(false);
        }

        fs.stat(path.resolve(cwd(), input), (err, stats) => {
          if (err) {
            resolve(true);
          } else if (stats.isDirectory()) {
            resolve('directory already exists');
          } else {
            resolve(true);
          }
        });
      });
    },
  });
} else {
  projectOpts.name = argv[2];
}

questions.push({
  type: 'confirm',
  name: 'hasGit',
  message: 'Do we need git versioning ?',
});

questions.push({
  type: 'confirm',
  name: 'hasLint',
  message: 'Do we need linting ?',
});

questions.push({
  type: 'confirm',
  name: 'hasTest',
  message: 'Do we need testing ?',
});

module.exports = {
  projectOpts,
  questions,
};

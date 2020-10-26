const fs = require('fs');
const path = require('path');
const { cwd } = process;

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's the project name ?",
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!/^[a-zA-Z0-9\-\._]+$/.test(input)) {
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
  },
  {
    type: 'confirm',
    name: 'git',
    message: 'Do we need git versioning ?',
  },
  {
    type: 'confirm',
    name: 'lint',
    message: 'Do we need linting ?',
  },
  {
    type: 'confirm',
    name: 'test',
    message: 'Do we need testing ?',
  }
];


module.exports = {
  questions,
};

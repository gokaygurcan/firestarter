// gokaygurcan/firestarter

'use strict';

// node modules
const _ = require('lodash');
const inquirer = require('inquirer');

// local modules
const cli = require('./cli');
const desktop = require('./desktop');
const web = require('./web');

const firestarter = config => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What is the project type?',
      choices: [
        'Web',
        'Desktop',
        'CLI',
      ],
      filter: type => type.toLowerCase()
    }
  ]).then(answer => {
    const type = answer.type;

    if (type === 'web') {
      web(config);
    }
    else if (type === 'desktop') {
      desktop(config);
    }
    else if (type === 'cli') {
      cli(config);
    }
  });
};

// export
module.exports = firestarter;

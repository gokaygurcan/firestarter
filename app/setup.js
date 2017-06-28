// gokaygurcan/firestarter

'use strict';

// core modules
const fs = require('fs');
const os = require('os');
const path = require('path');

// node modules
const inquirer = require('inquirer');
const is = require('is_js');

// variables
const rc = path.normalize(path.join(os.homedir(), '/', '.firestarterrc'));

const setup = () => new Promise((resolve, reject) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `What's your name?`,
      validate: name => {
        if (is.empty(name)) {
          return 'Please enter your name.';
        }

        return true;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `What's your e-mail address?`,
      validate: email => {
        if (is.not.email(email)) {
          return 'Please enter your e-mail address.';
        }

        return true;
      },
      filter: email => email.toLowerCase()
    },
    {
      type: 'input',
      name: 'url',
      message: `What's your webpage url? (optional)`,
      validate: url => {
        if (is.url.empty) {
          return true;
        }
        else {
          if (is.not.url(url)) {
            return 'Please enter your webpage url.';
          }

          return true;
        }
      },
      filter: url => url.toLowerCase()
    },
    {
      type: 'input',
      name: 'github',
      message: `What's your GitHub handle?`,
      validate: github => {
        if (/^[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){0,38}$/.test(github) !== true) {
          return 'Please enter your GitHub handle.';
        }

        return true;
      },
      filter: github => github.toLowerCase()
    }/*,
    {
      type: 'input',
      name: 'twitter',
      message: `What's your Twitter handle? (optional)`,
      validate: twitter => {
        if (is.url.empty) {
          return true;
        }
        else {
          if (/^\w{1,15}$/.test(twitter) !== true) {
            return 'Please enter your Twitter handle.';
          }

          return true;
        }
      },
      filter: twitter => twitter.toLowerCase()
    }*/
  ]).then(answers => {
    fs.writeFile(rc, JSON.stringify(answers, null, 2), 'utf8', err => {
      if (err) {
        reject(new Error('Setup'));
      }

      resolve(true);  
    });
  });
});

// export
module.exports = setup;

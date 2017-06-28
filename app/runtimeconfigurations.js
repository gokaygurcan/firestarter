// gokaygurcan/firestarter

'use strict';

// core modules
const fs = require('fs');
const os = require('os');
const path = require('path');

// variables
const rc = path.normalize(path.join(os.homedir(), '/', '.firestarterrc'));

const runtimeConfigurations = () => new Promise((resolve, reject) => {
  fs.readFile(rc, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Runtime Configurations'));
    }

    resolve(data);
  });
});

module.exports = runtimeConfigurations;

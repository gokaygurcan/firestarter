#!/usr/bin/env node

'use strict';

// core modules
const fs = require('fs');
const os = require('os');
const path = require('path');

// local modules
const firestarter = require('../app/firestarter');
const runtimeConfigurations = require('../app/runtimeconfigurations');
const setup = require('../app/setup');

// variables
const rc = path.normalize(path.join(os.homedir(), '/', '.firestarterrc'));
const forced = process.argv.indexOf('--setup') > -1;

// start here
fs.exists(rc, exists => {
  if (forced) {
    setup();
  }
  else {
    if (exists) {
      runtimeConfigurations().then(config => {
        firestarter(config);
      });
    }
    else {
      setup().then(result => {
        if (result) {
          runtimeConfigurations().then(config => {
            firestarter(config);
          });
        }
      });
    }
  }
});

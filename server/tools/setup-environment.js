#!/usr/bin/env node

var fs = require('fs');
var numberVersion = require('../package.json').version;


// ===================
// src/utils/environment.ts

for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--env') {
        if (process.argv[i + 1]) {
            configurationFile = process.argv[i + 1] + '.env.ts';
        }
    }
}

var rd = fs.createReadStream('environments/' + configurationFile)
var wd = fs.createWriteStream('src/utils/environment.ts');

rd.on('error', handleError);
wd.on('error', handleError);

function handleError(err) {
    rd.destroy();
    wd.end();
    console.error('There was an error while copying the environmemt configuration file: ' + configurationFile);
    console.error(err);
}

rd.pipe(wd);

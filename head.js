const fs = require('fs');
const { readFile, existsSync } = fs;
const { performHead } = require('./src/headOperation');

const display = function ({ error, lines }) {
  error && process.stderr.write(error);
  lines && process.stdout.write(lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  performHead(cmdLineArgs, { readFile, existsSync }, display);
};

main();

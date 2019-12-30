const fs = require('fs');
const { readFile } = fs;
const { performHead } = require('./src/headOperation');

const display = function ({ error, lines }) {
  process.stderr.write(error);
  process.stdout.write(lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  performHead(cmdLineArgs, readFile, display);
};

main();

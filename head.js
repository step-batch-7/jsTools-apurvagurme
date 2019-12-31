const fs = require('fs');
const { createReadStream } = fs;
const { performHead } = require('./src/headLib');

const display = function ({ error, lines }) {
  process.stderr.write(error);
  process.stdout.write(lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  performHead(cmdLineArgs, createReadStream, display);
};

main();

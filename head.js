const fs = require('fs');
const { stderr, stdout, stdin } = process;
const { readFile, existsSync } = fs;
const { performHead } = require('./src/headOperation');

const display = function({ error, lines }) {
  error && process.stderr.write(error);
  lines && process.stdout.write(lines);
};

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  performHead(cmdLineArgs, { readFile, existsSync }, { stderr, stdout, stdin }, display);
};

main();

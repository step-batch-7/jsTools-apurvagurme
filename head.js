const fs = require('fs');
const process = require('process');
const { performHead } = require('./src/headOperation');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const { error, lines } = performHead(cmdLineArgs, fs, process);
  process.stderr.write(error);
  process.stdout.write(lines);
};

main();

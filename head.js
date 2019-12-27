const fs = require('fs');
const process = require('process');
const { performOpt } = require('./src/headOperation');
process.stdin.setEncoding('utf8');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const { error, lines } = performOpt(cmdLineArgs, fs, process);
  process.stderr.write(error);
  process.stdout.write(lines);
};

main();

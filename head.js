const fs = require('fs');
const { readFileSync, existsSync } = fs;
const { getHeadLinesOrError } = require('./src/headOperation');
const { stdout, stderr } = require('process');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const output = getHeadLinesOrError(cmdLineArgs, readFileSync, existsSync);
  stderr.write(output.error);
  stdout.write(output.headLines);
};

main();

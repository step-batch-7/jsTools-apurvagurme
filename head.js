const fs = require('fs');
const { readFileSync, existsSync } = fs;
const { getHeadLinesOrError } = require('./src/headOperation');
const { stdout, stderr } = require('process');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const displayOutput = function(output) {
    output.error && stderr.write(output.error);
    output.headLines && stdout.write(output.headLines);
  };
  getHeadLinesOrError(cmdLineArgs, displayOutput, readFileSync, existsSync);
};

main();

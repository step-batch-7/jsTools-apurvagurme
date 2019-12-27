const fs = require('fs');
const { stderr, stdout, stdin } = process;
const { readFileSync, existsSync } = fs;
const { performHead } = require('./src/headOperation');

const display = function(output) {};

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const { error, lines } = performHead(
    cmdLineArgs,
    { readFileSync, existsSync },
    { stderr, stdout, stdin }
  );
  process.stderr.write(error);
  process.stdout.write(lines);
};

main();

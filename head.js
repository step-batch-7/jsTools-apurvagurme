const fs = require('fs');
const { readFileSync, existsSync } = fs;
const { getHeadLinesOrError } = require('./src/headOperation');

const main = function() {
  const userInput = process.argv.slice(2);
  const func1 = console.log;
  const func2 = console.error;
  const [funcRef, result] = getHeadLinesOrError(userInput, func1, func2, readFileSync, existsSync);
  funcRef(result);
};

main();

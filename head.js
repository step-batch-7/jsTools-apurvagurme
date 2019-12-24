const { getHeadLinesOrError } = require('./src/getHead');

const main = function () {
  const userInput = process.argv.slice(2);
  const func1 = console.log;
  const func2 = console.error;
  const [funcRef, result] = getHeadLinesOrError(userInput, func1, func2);
  funcRef(result);
};

main();

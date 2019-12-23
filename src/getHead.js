const fs = require('fs');
const Head = require('./headLib.js');

const parseCmdLineArgs = function(cmdLineArgs) {
  const parsedInput = {};
  if (cmdLineArgs.includes('-n')) {
    parsedInput.requiredNoOfLines = cmdLineArgs[cmdLineArgs.indexOf('-n') + 1];
    parsedInput.filePath = cmdLineArgs.slice(cmdLineArgs.indexOf('-n') + 2);
  } else {
    parsedInput.filePath = cmdLineArgs;
  }
  return parsedInput;
};

const getHeadLinesOrError = function(userInput, outLog, errorLog) {
  const parsedInput = parseCmdLineArgs(userInput);
  const head = new Head(parsedInput.filePath, parsedInput.requiredNoOfLines);
  const operation = head.getFileContents(
    parsedInput.filePath[0],
    fs.readFileSync,
    fs.existsSync
  );
  if (operation.hasOwnProperty('lines')) {
    const result = performHeadOperation(head, operation);
    return [outLog, result];
  }
  const result = operation.error;
  return [errorLog, result];
};

const performHeadOperation = function(head, operation) {
  const separatedLines = head.separateAllLines(operation.lines);
  const requiredLines = head.extractFirstNLines(separatedLines);
  const formattedLines = head.formatLines(requiredLines);
  return formattedLines;
};

module.exports = {
  getHeadLinesOrError,
  performHeadOperation,
  parseCmdLineArgs
};

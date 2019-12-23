const fs = require('fs');
const Head = require('./headLib.js');

const getHeadLinesOrError = function(userInput, outLog, errorLog) {
  const head = new Head();
  const parsedInput = head.initialize(userInput);
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

module.exports = { getHeadLinesOrError, performHeadOperation };

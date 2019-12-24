const Head = require('./headLib.js');

const parseCmdLineArgs = function(cmdLineArgs) {
  const parsedCmdLineArgs = {};
  if (cmdLineArgs[0] == '-n') {
    parsedCmdLineArgs.requiredNoOfLines = cmdLineArgs[1];
    parsedCmdLineArgs.filePath = cmdLineArgs[2];
  } else {
    parsedCmdLineArgs.filePath = cmdLineArgs;
  }
  return parsedCmdLineArgs;
};

const getHeadLinesOrError = function(cmdLineArgs, displayOutput, readFunc, existsFunc) {
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs);
  const result = {};
  const head = new Head(
    readFunc,
    existsFunc,
    parsedCmdLineArgs.filePath,
    parsedCmdLineArgs.requiredNoOfLines
  );
  const fileContents = head.getFileContents(parsedCmdLineArgs.filePath[0]);
  if (fileContents.error == undefined) {
    result['headLines'] = performHeadOperation(head, fileContents);
    return displayOutput(result);
  }
  result['error'] = fileContents.error;
  return displayOutput(result);
};

const performHeadOperation = function(head, fileContents) {
  const separatedLines = fileContents.lines.split('\n');
  const requiredLines = head.extractFirstNLines(separatedLines);
  const formattedLines = requiredLines.join('\n');
  return formattedLines;
};

module.exports = { getHeadLinesOrError, performHeadOperation, parseCmdLineArgs };

const Head = require('./headLib.js');

const parseCmdLineArgs = function(cmdLineArgs) {
  const parsedCmdLineArgs = {};
  let filePath = cmdLineArgs[0];
  let requiredNoOfLines = 10;
  if (cmdLineArgs[0] == '-n') {
    requiredNoOfLines = cmdLineArgs[1];
    filePath = cmdLineArgs[2];
  }
  parsedCmdLineArgs.filePath = filePath;
  parsedCmdLineArgs.requiredNoOfLines = requiredNoOfLines;
  return parsedCmdLineArgs;
};

const getHeadLinesOrError = function(cmdLineArgs, readFunc, existsFunc) {
  const result = { error: '', headLines: '' };
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs);
  const head = new Head(
    readFunc,
    existsFunc,
    parsedCmdLineArgs.filePath,
    parsedCmdLineArgs.requiredNoOfLines
  );
  const fileContents = head.getFileContents(parsedCmdLineArgs.filePath);
  if (fileContents.error == '') {
    const requiredLines = head.extractFirstNLines(fileContents.lines.split('\n')).join('\n');
    result.headLines = requiredLines;
    return result;
  }
  result.error = fileContents.error;
  return result;
};

module.exports = { getHeadLinesOrError, parseCmdLineArgs };

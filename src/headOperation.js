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

const getHeadLines = function(cmdLineArgs, fs) {
  const { readFileSync, existsSync } = fs;
  const result = { error: '', headLines: '' };
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs);
  const head = new Head(
    readFileSync,
    existsSync,
    parsedCmdLineArgs.filePath,
    parsedCmdLineArgs.requiredNoOfLines
  );
  const fileContents = head.getFileContents(parsedCmdLineArgs.filePath);
  if (fileContents.error == '') {
    const result = extractHeadLines(fileContents.lines, head);
    return result;
  }
  result.error = fileContents.error;
  return result;
};

const extractHeadLines = function(lines, head) {
  const result = { error: '', lines: '' };
  const requiredLines = head.extractFirstNLines(lines.split('\n')).join('\n');
  result.lines = requiredLines;
  return result;
};

module.exports = { getHeadLines, parseCmdLineArgs, extractHeadLines };

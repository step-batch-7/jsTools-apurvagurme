const performHead = function(cmdLineArgs, fs, process, display) {
  getHeadLines(cmdLineArgs, fs, display);
};

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

const getHeadLines = function(cmdLineArgs, fs, display) {
  const { readFile, existsSync } = fs;
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs);
  getFileContents(parsedCmdLineArgs, display, existsSync, readFile);
};

const getFileContents = function(parsedCmdLineArgs, display, isExistFunc, readFile) {
  const { filePath, requiredNoOfLines } = parsedCmdLineArgs;
  const content = { error: '', lines: '' };
  if (!isExistFunc(filePath)) {
    content.error = `head: ${filePath}: No such file or directory`;
    display(content);
    return;
  }
  readFile(filePath, 'utf8', (err, data) => stdInput(err, data, display, requiredNoOfLines));
};

const stdInput = function(err, data, display, requiredNoOfLines) {
  const content = { error: '', lines: '' };
  content.lines = extractFirstNLines(data.split('\n'), requiredNoOfLines).join('\n');
  display(content);
};

const extractFirstNLines = function(contents, requiredNoOfLines) {
  const firstNLines = contents.slice(0, requiredNoOfLines);
  return firstNLines;
};

module.exports = {
  getHeadLines,
  parseCmdLineArgs,
  performHead,
  stdInput,
  extractFirstNLines
};

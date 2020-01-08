const OptionParser = require('./parseInput');
const EMPTY_STRING = '';

const getCmdLineArgsInfo = function (cmdLineArgsInfo, noOfLine, file) {
  cmdLineArgsInfo.noOfLines = noOfLine;
  cmdLineArgsInfo.filePath = file;
  return cmdLineArgsInfo;
};

const getIllegalOptMsg = function (firstCmdArg) {
  const cmdLineArgsInfo = {};
  const optionIndex = 1;
  const illegalOption = firstCmdArg.slice(optionIndex);
  const firstErrLine = `head: illegal option -- ${illegalOption}\n`;
  const secondErrLine = 'usage: head [-n lines | -c bytes] [file ...]';
  cmdLineArgsInfo.error = firstErrLine + secondErrLine;
  cmdLineArgsInfo.lines = EMPTY_STRING;
  return cmdLineArgsInfo;
};

const extractFirstNLines = function (contents, noOfLines) {
  const indexOfFirstLine = 0;
  const splittedData = contents.split('\n');
  const lines = splittedData.slice(indexOfFirstLine, noOfLines);
  return lines.join('\n');
};

const loadFileContents = function (inputStream, filePath, onLoadComplete) {
  inputStream.on('data', (data) => {
    onLoadComplete(data, EMPTY_STRING);
  });
  inputStream.on('error', (err) => {
    if (err && err.code === 'ENOENT') {
      const error = `head: ${filePath}: No such file or directory`;
      onLoadComplete(EMPTY_STRING, error);
    } else {
      const error = err.message;
      onLoadComplete(EMPTY_STRING, error);
    }
  });
};

const performHead = function (cmdLineArgs, streamPicker, onCompletion) {
  const optionParser = new OptionParser(['-n']);
  let parsedCmdLineArgs = {
    error: EMPTY_STRING,
    noOfLines: 10, filePath: EMPTY_STRING,
    illegalOption: ''
  };
  parsedCmdLineArgs = optionParser.parse(cmdLineArgs, parsedCmdLineArgs);
  if (parsedCmdLineArgs.illegalOption !== EMPTY_STRING) {
    const { error, lines } = getIllegalOptMsg(parsedCmdLineArgs.illegalOption);
    return onCompletion({ error, lines });
  }
  const { filePath, noOfLines } = parsedCmdLineArgs;
  const inputStream = streamPicker.pick(filePath);
  const onLoadComplete = (data, error) => {
    if (data) {
      const lines = extractFirstNLines(data.toString(), noOfLines);
      onCompletion({ lines, error: EMPTY_STRING });
    } else {
      onCompletion({ error, lines: EMPTY_STRING });
    }
  };
  loadFileContents(inputStream, filePath, onLoadComplete);
};

module.exports = {
  getCmdLineArgsInfo,
  getIllegalOptMsg,
  performHead,
  extractFirstNLines,
  loadFileContents
};

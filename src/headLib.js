const EMPTY_STRING = '';

const getCmdLineArgsInfo = function (cmdLineArgsInfo, noOfLine, file) {
  cmdLineArgsInfo.noOfLines = noOfLine;
  cmdLineArgsInfo.filePath = file;
  return cmdLineArgsInfo;
};

const displayIllegalOpt = function (firstCmdArg) {
  const cmdLineArgsInfo = {};
  const optionIndex = 1;
  const illegalOption = firstCmdArg.slice(optionIndex);
  const firstErrLine = `head: illegal option -- ${illegalOption}\n`;
  const secondErrLine = 'usage: head [-n lines | -c bytes] [file ...]';
  cmdLineArgsInfo.error = firstErrLine + secondErrLine;
  cmdLineArgsInfo.lines = EMPTY_STRING;
  return cmdLineArgsInfo;
};

const parseCmdLineArgs = function (cmdLineArgs) {
  const cmdLineArgsInfo = {
    error: EMPTY_STRING,
    noOfLines: 10, filePath: EMPTY_STRING
  };
  if (!cmdLineArgs.length) {
    return cmdLineArgsInfo;
  }
  const [firstCmdArg, noOfLine, file] = cmdLineArgs;
  if (/^-/.test(firstCmdArg)) {
    if (/-n/.test(firstCmdArg)) {
      return getCmdLineArgsInfo(cmdLineArgsInfo, noOfLine, file);
    }
    return displayIllegalOpt(firstCmdArg);
  }
  cmdLineArgsInfo.filePath = firstCmdArg;
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
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs, onCompletion);
  if (parsedCmdLineArgs.error !== EMPTY_STRING) {
    return onCompletion(parsedCmdLineArgs);
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
  parseCmdLineArgs,
  getCmdLineArgsInfo,
  displayIllegalOpt,
  performHead,
  extractFirstNLines,
  loadFileContents
};

const getCmdLineArgsInfo = function (cmdLineArgsInfo, noOfLine, file) {
  cmdLineArgsInfo.noOfLines = noOfLine;
  cmdLineArgsInfo.filePath = file;
  return cmdLineArgsInfo;
};

const displayIllegalOpt = function (firstCmdArg) {
  const cmdLineArgsInfo = {};
  const firstErrLine = `head: illegal option -- ${firstCmdArg.slice(1)}\n`;
  const secondErrLine = 'usage: head [-n lines | -c bytes] [file ...]';
  cmdLineArgsInfo.error = firstErrLine + secondErrLine;
  cmdLineArgsInfo.lines = '';
  return cmdLineArgsInfo;
};

const parseCmdLineArgs = function (cmdLineArgs) {
  const cmdLineArgsInfo = { error: '', noOfLines: 10, filePath: '' };
  const [firstCmdArg, noOfLine, file] = cmdLineArgs;
  if (firstCmdArg.startsWith('-')) {
    if (firstCmdArg.slice(1) === 'n') {
      return getCmdLineArgsInfo(cmdLineArgsInfo, noOfLine, file);
    }
    const output = displayIllegalOpt(firstCmdArg);
    return output;
  }
  cmdLineArgsInfo.filePath = firstCmdArg;
  return cmdLineArgsInfo;
};

const performHead = function (cmdLineArgs, readFile, display) {
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs, display);
  if (parsedCmdLineArgs.error !== '') { display(parsedCmdLineArgs); return; }
  const { filePath, noOfLines } = parsedCmdLineArgs;
  const cmdLineArgsInfo = { error: '', lines: '' };
  readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      cmdLineArgsInfo.error = `head: ${filePath}: No such file or directory`;
      display(cmdLineArgsInfo);
      return;
    }
    const output = callback(err, data, noOfLines);
    display(output);
  });
};

const callback = function (err, data, noOfLines) {
  if (err) {
    return { error: err.message, lines: '' };
  }
  const cmdLineArgsInfo = { error: '', lines: '' };
  const splitted = data.split('\n');
  cmdLineArgsInfo.lines = extractFirstNLines(splitted, noOfLines).join('\n');
  return cmdLineArgsInfo;
};

const extractFirstNLines = function (contents, noOfLines) {
  const indexOfFirstLine = 0;
  const firstNLines = contents.slice(indexOfFirstLine, noOfLines);
  return firstNLines;
};

module.exports = {
  parseCmdLineArgs,
  getCmdLineArgsInfo,
  displayIllegalOpt,
  performHead,
  callback,
  extractFirstNLines
};

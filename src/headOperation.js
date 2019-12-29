const parseCmdLineArgs = function (cmdLineArgs, display) {
  const cmdLineArgsInfo = { error: '', noOfLines: 10, filePath: '' };
  const [firstCmdArg, noOfLine, file] = cmdLineArgs;
  if (firstCmdArg.startsWith('-')) {
    if (firstCmdArg.slice(1) === 'n') {
      return getCmdLineArgsInfo(cmdLineArgsInfo, noOfLine, file);
    }
    displayIllegalOpt(firstCmdArg, display);
    return;
  }
  cmdLineArgsInfo.filePath = firstCmdArg;
  return cmdLineArgsInfo;
};

const getCmdLineArgsInfo = function (cmdLineArgsInfo, noOfLine, file) {
  cmdLineArgsInfo.noOfLines = noOfLine;
  cmdLineArgsInfo.filePath = file;
  return cmdLineArgsInfo;
};

const displayIllegalOpt = function (firstCmdArg, display) {
  const cmdLineArgsInfo = {};
  cmdLineArgsInfo.error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
  cmdLineArgsInfo.lines = '';
  display(cmdLineArgsInfo);
};

const performHead = function (cmdLineArgs, fs, display) {
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs, display);
  if (parsedCmdLineArgs === undefined) { return; }
  const { filePath, noOfLines } = parsedCmdLineArgs;
  const cmdLineArgsInfo = { error: '', lines: '' };
  if (!fs.existsSync(filePath)) {
    cmdLineArgsInfo.error = `head: ${filePath}: No such file or directory`;
    display(cmdLineArgsInfo);
    return;
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    stdInput(err, data, { display, noOfLines });
  });
};

const stdInput = function (err, data, { display, noOfLines }) {
  if (err) {
    const result = { error: err, lines: '' };
    display(result);
  }
  const cmdLineArgsInfo = { error: '', lines: '' };
  const splitted = data.split('\n');
  cmdLineArgsInfo.lines = extractFirstNLines(splitted, noOfLines).join('\n');
  display(cmdLineArgsInfo);
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
  stdInput,
  extractFirstNLines
};

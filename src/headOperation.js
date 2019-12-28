const parseCmdLineArgs = function(cmdLineArgs) {
  const parsedCmdLineArgs = {};
  const indexOfFirstElement = 0;
  let filePath = cmdLineArgs[indexOfFirstElement];
  let requiredNoOfLines = 10;
  if (cmdLineArgs[indexOfFirstElement] === '-n') {
    [, requiredNoOfLines, filePath] = cmdLineArgs;
  }
  parsedCmdLineArgs.filePath = filePath;
  parsedCmdLineArgs.requiredNoOfLines = requiredNoOfLines;
  return parsedCmdLineArgs;
};

const performHead = function(cmdLineArgs, fs, display) {
  const parsedCmdLineArgs = parseCmdLineArgs(cmdLineArgs);
  const { readFile, existsSync } = fs;
  const { filePath, requiredNoOfLines } = parsedCmdLineArgs;
  const content = { error: '', lines: '' };
  if (!existsSync(filePath)) {
    content.error = `head: ${filePath}: No such file or directory`;
    display(content);
    return;
  }
  readFile(filePath, 'utf8', (err, data) => {
    stdInput(err, data, { display, requiredNoOfLines });
  });
};

const stdInput = function(err, data, { display, requiredNoOfLines }) {
  if (err) {
    const result = { error: err, lines: '' };
    display(result);
  }
  const content = { error: '', lines: '' };
  const splitted = data.split('\n');
  content.lines = extractFirstNLines(splitted, requiredNoOfLines).join('\n');
  display(content);
};

const extractFirstNLines = function(contents, requiredNoOfLines) {
  const indexOfFirstLine = 0;
  const firstNLines = contents.slice(indexOfFirstLine, requiredNoOfLines);
  return firstNLines;
};

module.exports = {
  parseCmdLineArgs,
  performHead,
  stdInput,
  extractFirstNLines
};

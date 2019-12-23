class Head {
  constructor() {
    this.filePath = [];
    this.requiredNoOfLines = 10;
  }

  getFileContents(path, readFunc, isExistFunc) {
    if (isExistFunc(path)) {
      const contents = readFunc(path, 'utf8');
      return { lines: contents };
    }
    return {
      error: `head: ${path}: No such file or directory`
    };
  }

  separateAllLines(contents) {
    const lines = contents.split('\n');
    return lines;
  }

  extractFirstNLines(contents) {
    const firstNLines = contents.filter(
      (oneLine, index) => index < this.requiredNoOfLines
    );
    return firstNLines;
  }

  formatLines(requiredLines) {
    return requiredLines.join('\n');
  }

  initialize(cmdLineArgs) {
    if (cmdLineArgs.includes('-n')) {
      this.requiredNoOfLines = cmdLineArgs[cmdLineArgs.indexOf('-n') + 1];
      this.filePath = cmdLineArgs.slice(cmdLineArgs.indexOf('-n') + 2);
    } else {
      this.filePath = cmdLineArgs;
    }
    return this;
  }
}

module.exports = Head;

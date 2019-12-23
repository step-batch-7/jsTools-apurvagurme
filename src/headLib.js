class Head {
  constructor() {
    this.filePath = [];
    this.requiredNoOfLines = 10;
  }

  getFileContents(path, readFunc, isExistFunc) {
    if (isExistFunc(path)) {
      const contents = readFunc(path, 'utf8');
      return contents;
    }
    throw new Error(`head: ${path}: No such file or directory`);
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

  parseInput = function(userInput) {
    if (userInput.includes('-n')) {
      this.requiredNoOfLines = userInput[userInput.indexOf('-n') + 1];
      this.filePath = userInput.slice(userInput.indexOf('-n') + 2);
    } else {
      this.filePath = userInput;
    }
    return { filePath: this.filePath, numberOfLines: this.requiredNoOfLines };
  };
}

module.exports = Head;

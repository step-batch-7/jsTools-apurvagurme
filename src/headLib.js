const fs = require('fs');

class Head {
  constructor(filePath, requiredNoOfLines = 10) {
    this.filePath = filePath;
    this.requiredNoOfLines = requiredNoOfLines;
    this.readFunc = fs.readFileSync;
    this.isExistFunc = fs.existsSync;
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
}

module.exports = Head;

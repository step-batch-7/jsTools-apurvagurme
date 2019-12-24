const fs = require('fs');

class Head {
  constructor(filePath, requiredNoOfLines = 10) {
    this.filePath = filePath;
    this.requiredNoOfLines = requiredNoOfLines;
    this.readFunc = fs.readFileSync;
    this.isExistFunc = fs.existsSync;
  }

  getFileContents(path) {
    if (this.isExistFunc(path)) {
      const contents = this.readFunc(path, 'utf8');
      return { lines: contents };
    }
    const error = `head: ${path}: No such file or directory`;
    return { error };
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

const fs = require('fs');
const { existsSync } = fs;
const { stderr } = require('process');

class Head {
  constructor(filename, requiredNoOfLines) {
    this.filenames = [filename];
    this.requiredNoOfLines = 10;
  }

  getFileContents(filePath) {
    if (existsSync(filePath)) {
      const contents = fs.readFileSync(filePath, 'utf8');
      return contents;
    } else {
      throw new Error(`head: ${filePath}: No such file or directory`);
    }
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

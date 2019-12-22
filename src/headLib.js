const fs = require('fs');

class Head {
  constructor() {
    this.filenames = [];
    this.requiredNoOfLines = 10;
  }

  parseInput(userOptions) {
    return { filenames: userOptions };
  }

  getFileContents(filePath) {
    if (filePath.exists) {
      const contents = fs.readFileSync(filePath);
      return contents;
    }
    return [`head: ${filePath}: No such file or directory`];
  }

  separateAllLines(contents) {
    return contents.split('\n');
  }

  extractFirstNLines(contents) {
    const firstNLines = contents.filter((oneLine, index) => {
      if (index < this.requiredNoOfLines) {
        return oneLine;
      }
    });
    return firstNLines;
  }
}

module.exports = Head;

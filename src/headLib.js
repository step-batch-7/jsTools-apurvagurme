class Head {
  constructor(readFunc, existsFunc, filePath, requiredNoOfLines = 10) {
    this.filePath = filePath;
    this.requiredNoOfLines = requiredNoOfLines;
    this.readFunc = readFunc;
    this.isExistFunc = existsFunc;
  }

  getFileContents(path) {
    if (this.isExistFunc(path)) {
      const contents = this.readFunc(path, 'utf8');
      return { lines: contents };
    }
    const error = `head: ${path}: No such file or directory`;
    return { error };
  }

  extractFirstNLines(contents) {
    const firstNLines = contents.filter((oneLine, index) => index < this.requiredNoOfLines);
    return firstNLines;
  }
}

module.exports = Head;

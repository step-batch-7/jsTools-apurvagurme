class Head {
  constructor(readFunc, existsFunc, filePath, requiredNoOfLines) {
    this.filePath = filePath;
    this.requiredNoOfLines = requiredNoOfLines;
    this.readFunc = readFunc;
    this.isExistFunc = existsFunc;
  }

  getFileContents(path) {
    const content = { error: '', lines: '' };
    if (!this.isExistFunc(path)) {
      content.error = `head: ${path}: No such file or directory`;
      return content;
    }
    const contents = this.readFunc(path, 'utf8');
    content.lines = contents;
    return content;
  }

  extractFirstNLines(contents) {
    const firstNLines = contents.slice(0, this.requiredNoOfLines);
    return firstNLines;
  }
}

module.exports = Head;

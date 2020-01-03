class StreamPicker {
  constructor(createReadStream, stdin ) {
    this.createStream = createReadStream;
    this.stdin = stdin;
  }
  
  pick(filePath) {
    return filePath ? this.createStream(filePath) : this.stdin;
  }
}

module.exports = StreamPicker;

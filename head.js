const fs = require('fs');
const { createReadStream } = fs;
const { stdin, stderr, stdout } = process;
const { performHead } = require('./src/headLib');
const StreamPicker = require('./src/streamLib');

const display = function ({ error, lines }) {
  stderr.write(error);
  stdout.write(lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  const streamPicker = new StreamPicker(createReadStream, stdin);
  performHead(cmdLineArgs, streamPicker, display);
};

main();

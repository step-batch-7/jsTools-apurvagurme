const fs = require('fs');

const parseInput = function(userOptions) {
  return { filenames: userOptions };
};

const getFileContents = function(filePath) {
  if (filePath.exists) {
    const contents = fs.readFileSync(filePath);
    return contents;
  }
  return [`head: ${filePath}: No such file or directory`];
};

const separateAllLines = function(contents) {
  return contents.split('\n');
};

exports.parseInput = parseInput;
exports.getFileContents = getFileContents;
exports.separateAllLines = separateAllLines;

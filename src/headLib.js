const fs = require('fs');

const parseInput = function(userOptions) {
  return { filenames: userOptions };
};

const getFileContents = function(filePath) {
  const contents = fs.readFileSync(filePath);
  return contents;
};

exports.parseInput = parseInput;
exports.getFileContents = getFileContents;

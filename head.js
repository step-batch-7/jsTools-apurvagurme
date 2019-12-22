const Head = require('./src/headLib');

const main = function() {
  const [, , filename] = process.argv;
  const head = new Head(filename);
  try {
    const contents = head.getFileContents(filename);
    const separatedLines = head.separateAllLines(contents);
    const requiredLines = head.extractFirstNLines(separatedLines);
    const formattedLines = head.formatLines(requiredLines);
    console.log(formattedLines);
  } catch (err) {
    console.error(err.message);
  }
};

main();

const fs = require('fs');
const Head = require('./src/headLib');

const main = function() {
  const userInput = process.argv.slice(2);
  const head = new Head();
  const parsedInput = head.parseInput(userInput);
  try {
    const contents = head.getFileContents(
      parsedInput.filePath[0],
      fs.readFileSync,
      fs.existsSync
    );
    const separatedLines = head.separateAllLines(contents);
    const requiredLines = head.extractFirstNLines(separatedLines);
    const formattedLines = head.formatLines(requiredLines);
    console.log(formattedLines);
  } catch (err) {
    console.error(err.message);
  }
};

main();

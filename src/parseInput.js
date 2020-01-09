const EMPTY_STRING = '';

class OptionParser {
  constructor(lookup) {
    this.lookup = lookup;
    this.parsedCmdLineArgs = {
      error: EMPTY_STRING,
      noOfLines: 10, filePath: EMPTY_STRING,
      unknownOption: ''
    };
  }

  parse(cmdLineArgs) {
    const [firstCmdArg, noOfLine, file] = cmdLineArgs;
    if (/^-/.test(firstCmdArg)) {
      if (this.lookup[firstCmdArg]) {
        this.parsedCmdLineArgs[this.lookup[firstCmdArg]] = noOfLine;
        this.parsedCmdLineArgs.filePath = file;
        return this.parsedCmdLineArgs;
      }
      this.parsedCmdLineArgs.unknownOption = firstCmdArg;
      return this.parsedCmdLineArgs;
    }
    this.parsedCmdLineArgs.filePath = firstCmdArg;
    return this.parsedCmdLineArgs;
  }
}

module.exports = OptionParser;

class OptionParser {
  constructor(lookup) {
    this.lookup = lookup;
  }

  parse(cmdLineArgs, parsedCmdLineArgs) {
    const [firstCmdArg, noOfLine, file] = cmdLineArgs;
    if (/^-/.test(firstCmdArg)) {
      if (this.lookup.includes(firstCmdArg)) {
        parsedCmdLineArgs.noOfLines = noOfLine;
        parsedCmdLineArgs.filePath = file;
        return parsedCmdLineArgs;
      }
      parsedCmdLineArgs.illegalOption = firstCmdArg;
      return parsedCmdLineArgs;
    }
    parsedCmdLineArgs.filePath = firstCmdArg;
    return parsedCmdLineArgs;
  }
}

module.exports = OptionParser;

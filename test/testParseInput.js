const { assert } = require('chai');
const OptionParser = require('../src/parseInput');

describe('OptionParser', function () {
  describe('parseCmdLineArgs', function () {
    it('should give an instance of the Parse', () => {
      const optionParser = new OptionParser(['-n']);
      const expected = { lookup: ['-n'], parsedCmdLineArgs: { error: '', filePath: '', noOfLines: 10, unknownOption: '' } };
      assert.deepStrictEqual(optionParser, expected);
    });

    it('should give the given file and the default number of lines required', () => {
      const optionParser = new OptionParser(['-n']);
      const userInputs = ['file1'];
      const parsedCmdLineArgs = {
        error: '',
        filePath: '',
        unknownOption: '',
        noOfLines: 10,
      };
      const expected = { error: '', filePath: 'file1', noOfLines: 10, unknownOption: '' };
      assert.deepStrictEqual(optionParser.parse(userInputs, parsedCmdLineArgs), expected);
    });

    it('should give an error of illegal option when given option is invalid', () => {
      const optionParser = new OptionParser({ '-n': 'noOfLines' });
      const userInputs = ['-n', '2', 'file1'];
      const parsedCmdLineArgs = {
        error: '',
        filePath: '',
        unknownOption: '',
        noOfLines: 10,
      };
      const expected = { error: '', filePath: 'file1', unknownOption: '', noOfLines: '2' };
      assert.deepStrictEqual(optionParser.parse(userInputs, parsedCmdLineArgs), expected);
    });
  });
});

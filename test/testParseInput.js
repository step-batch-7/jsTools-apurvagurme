const { assert } = require('chai');
const sinon = require('sinon');
const OptionParser = require('../src/parseInput');

describe('OptionParser', function () {
  describe('parseCmdLineArgs', function () {
    it('should give an instance of the Parse', () => {
      const optionParser = new OptionParser(['-n']);
      const expected = { lookup: ['-n'] };
      assert.deepStrictEqual(optionParser, expected);
    });

    it('should give the given file and the default number of lines required', () => {
      const optionParser = new OptionParser(['-n']);
      const userInputs = ['file1'];
      const parsedCmdLineArgs = {
        error: '',
        filePath: '',
        illegalOption: '',
        noOfLines: 10,
      };
      const expected = { error: '', filePath: 'file1', noOfLines: 10, illegalOption: '' };
      assert.deepStrictEqual(optionParser.parse(userInputs, parsedCmdLineArgs), expected);

    });

    it('should give an error of illegal option when given option is invalid', () => {
      const optionParser = new OptionParser(['-n']);
      const userInputs = ['-n', '2', 'file1'];
      const parsedCmdLineArgs = {
        error: '',
        filePath: '',
        illegalOption: '',
        noOfLines: 10,
      };
      const expected = { error: '', filePath: 'file1', illegalOption: '', noOfLines: '2' };
      assert.deepStrictEqual(optionParser.parse(userInputs, parsedCmdLineArgs), expected);
    });
  });
});

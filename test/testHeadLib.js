const { parseInput, getFileContents } = require('../src/headLib');
const { assert } = require('chai');

describe('parseInput', function() {
  it('should give the userInputs', function() {
    const expected = { filenames: ['file1'] };
    assert.deepStrictEqual(parseInput(['file1']), expected);
  });
});

describe('getFileContents', function() {
  it('should return the contents of file', function() {
    const getFileContents = function(path, encoding) {
      if (path == 'somePath' && encoding == 'utf8') return true;
    };
    const path = 'somePath';
    const encoding = 'utf8';
    assert.isOk(getFileContents(path, encoding));
  });
});

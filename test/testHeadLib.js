const {
  parseInput,
  getFileContents,
  separateAllLines
} = require('../src/headLib');
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
      return false;
    };
    const path = 'somePath';
    const encoding = 'utf8';
    assert.isOk(getFileContents(path, encoding));
  });

  it('should return false is file is not present', function() {
    const getFileContents = function(path, encoding) {
      if (path == 'somePat' && encoding == 'utf8') return true;
      return false;
    };
    const path = 'somePath';
    const encoding = 'utf8';
    assert.notOk(getFileContents(path, encoding));
  });
});

describe('separateAllLines', function() {
  it('should give all lines separated into an array', function() {
    const contents = 'one\ntwo\nthree';
    const expected = ['one', 'two', 'three'];
    assert.deepStrictEqual(separateAllLines(contents), expected);
  });
});

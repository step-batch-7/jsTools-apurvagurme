const Head = require('../src/headLib.js');
const { assert } = require('chai');

describe('parseInput', function() {
  it('should give the userInputs', function() {
    const head = new Head();
    const expected = { filenames: ['file1'] };
    assert.deepStrictEqual(head.parseInput(['file1']), expected);
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
    const head = new Head();
    const contents = 'one\ntwo\nthree';
    const expected = ['one', 'two', 'three'];
    assert.deepStrictEqual(head.separateAllLines(contents), expected);
  });
});

describe('extractFirstNLines', function() {
  it('should give the default 10 elements if required number of lines is not given', function() {
    const head = new Head();
    const fileContents = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11'
    ];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(head.extractFirstNLines(fileContents), expected);
  });

  it('should give all elements if total number of elements ara less than 10 required number of lines is not given', function() {
    const head = new Head();
    const fileContents = ['1', '2', '3'];
    const expected = ['1', '2', '3'];
    assert.deepStrictEqual(head.extractFirstNLines(fileContents), expected);
  });
});

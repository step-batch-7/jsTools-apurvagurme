const {
  extractFirstNLines,
  getHeadLines,
  parseCmdLineArgs,
  performHead,
  stdInput
} = require('../src/headOperation');
const { assert } = require('chai');
const fs = require('fs');

describe('parseCmdLineArgs', function() {
  it('should give the given file name and required number of lines in an object', function() {
    const userInputs = ['-n', '2', 'file1'];
    const expected = { filePath: 'file1', requiredNoOfLines: '2' };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs), expected);
  });

  it('should give the given file and the default number of lines required', function() {
    const userInputs = ['file1'];
    const expected = { filePath: 'file1', requiredNoOfLines: 10 };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs), expected);
  });
});

describe('performHead', function() {
  const readFile = function() {
    return 'fileContents';
  };

  const existsSync = function() {
    return true;
  };

  const display = function(output) {
    assert.equal(output.error, 'head: file1: No such file or directory');
    assert.equal(output.lines, '');
  };

  const fs = { readFile, existsSync };
  const process = {};
  it('should give the end result when standard input is not given', function() {
    const cmdLineArgs = ['file1'];
    const actual = performHead(cmdLineArgs, fs, process, display);
    const expected = undefined;
    assert.deepStrictEqual(actual, expected);
  });
});

describe('extractFirstNLines', function() {
  it('should give the default 10 elements if required number of lines is not given', function() {
    const fileContents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractFirstNLines(fileContents, 10), expected);
  });

  it('should give all elements if total number of elements are less than 10 required number of lines is not given', function() {
    const fileContents = ['1', '2', '3'];
    const expected = ['1', '2', '3'];
    assert.deepStrictEqual(extractFirstNLines(fileContents), expected);
  });
});

describe('stdInput', function() {
  it('should get standard input and display', function() {
    const requiredNoOfLines = 10;
    const display = function(output) {
      assert.equal(output.error, '');
      assert.equal(output.lines, 'file\nContents');
    };
    stdInput(null, 'file\nContents', { display, requiredNoOfLines });
  });
});

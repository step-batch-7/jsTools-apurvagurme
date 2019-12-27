const {
  extractHeadLines,
  getHeadLines,
  parseCmdLineArgs,
  performOpt
} = require('../src/headOperation');
const { assert } = require('chai');
const fs = require('fs');
const Head = require('../src/headLib');

describe('getHeadLines', function() {
  it('should give an error or the required headlines of the given file', function() {
    const expected = { error: 'head: file1: No such file or directory', lines: '' };
    const cmdLineArgs = ['-n', '2', 'file1'];
    assert.deepStrictEqual(getHeadLines(cmdLineArgs, fs), expected);
  });

  it('should give an error or the required headlines of the given file', function() {
    const readFileSync = function() {
      return 'fileContents';
    };
    const existsSync = function() {
      return true;
    };
    const fs = { readFileSync, existsSync };
    const expected = { error: '', lines: 'fileContents' };
    const cmdLineArgs = ['-n', '2', 'file1'];
    assert.deepStrictEqual(getHeadLines(cmdLineArgs, fs), expected);
  });
});

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

describe('extractHeadLines', function() {
  it('should give first N lines', function() {
    const head = new Head();
    const lines = 'file\ncontents';
    const actual = extractHeadLines(lines, head);
    const expected = { error: '', lines: 'file\ncontents' };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('performOpt', function() {
  const readFileSync = function() {
    return 'fileContents';
  };
  const existsSync = function() {
    return true;
  };
  const stdout = function() {
    console.log('fileContents');
  };
  const stdin = function() {
    return true;
  };
  const stderr = function() {
    return false;
  };
  const process = { stdin, stdout, stderr };
  const fs = { readFileSync, existsSync };
  it('should give the end result when standard input is not given', function() {
    const cmdLineArgs = ['file1'];
    const actual = performOpt(cmdLineArgs, fs, process);
    const expected = { error: '', lines: 'fileContents' };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give the headLines when standard input is given', function() {});
});

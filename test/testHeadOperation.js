const { extractHeadLines, getHeadLines, parseCmdLineArgs } = require('../src/headOperation');
const { assert } = require('chai');
const fs = require('fs');
const Head = require('../src/headLib');

describe('getHeadLines', function() {
  it('should give an error or the required headlines of the given file', function() {
    const expected = { error: 'head: file1: No such file or directory', headLines: '' };
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

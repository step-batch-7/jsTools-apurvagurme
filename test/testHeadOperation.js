const { getHeadLinesOrError, parseCmdLineArgs } = require('../src/headOperation');
const { assert } = require('chai');
const fs = require('fs');
const { readFileSync, existsSync } = fs;

describe('getHeadLinesOrError', function() {
  it('should give an error or the required headlines of the given file', function() {
    const expected = { error: 'head: file1: No such file or directory', headLines: '' };
    const cmdLineArgs = ['-n', '2', 'file1'];
    assert.deepStrictEqual(getHeadLinesOrError(cmdLineArgs, readFileSync, existsSync), expected);
  });

  it('should give an error or the required headlines of the given file', function() {
    const readFunc = function() {
      return 'fileContents';
    };
    const existsFunc = function() {
      return true;
    };
    const expected = { error: '', headLines: 'fileContents' };
    const cmdLineArgs = ['-n', '2', 'file1'];
    assert.deepStrictEqual(getHeadLinesOrError(cmdLineArgs, readFunc, existsFunc), expected);
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

const {
  getHeadLinesOrError,
  performHeadOperation,
  parseCmdLineArgs
} = require('../src/headOperation');
const { assert } = require('chai');
const Head = require('../src/headLib');
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

describe('performHeadOperation', function() {
  it('should give the result of head operation', function() {
    const head = new Head('readFunc', 'existsFunc', 'filePath', 10);
    const operation = { lines: 'one\ntwo' };
    const actual = performHeadOperation(head, operation);
    assert.strictEqual(actual, 'one\ntwo');
  });
});

describe('parseCmdLineArgs', function() {
  it('should give the userInputs', function() {
    const userInputs = ['-n', '2', 'file1'];
    const expected = { filePath: 'file1', requiredNoOfLines: '2' };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs), expected);
  });

  it('should give the userInputs', function() {
    const userInputs = ['file1'];
    const expected = { filePath: 'file1', requiredNoOfLines: 10 };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs), expected);
  });
});

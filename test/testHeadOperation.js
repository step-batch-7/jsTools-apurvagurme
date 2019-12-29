const {
  extractFirstNLines,
  getCmdLineArgsInfo,
  displayIllegalOpt,
  parseCmdLineArgs,
  performHead,
  stdInput
} = require('../src/headOperation');
const { assert } = require('chai');
const sinon = require('sinon');

describe('parseCmdLineArgs', function () {
  it('should give the given file name and required number of lines in an object', function () {
    const display = sinon.fake();
    const userInputs = ['-n', '2', 'file1'];
    const expected = { error: '', filePath: 'file1', noOfLines: '2' };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs, display), expected);
  });

  it('should give the given file and the default number of lines required', function () {
    const display = sinon.fake();
    const userInputs = ['file1'];
    const expected = { error: '', filePath: 'file1', noOfLines: 10 };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs, display), expected);
  });

  it('should give ', function () {
    const display = sinon.fake();
    const userInputs = ['-b', '2', 'file1'];
    const firstCmdArg = '-b';
    const error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
    const cmdLineArgsInfo = { error: error, lines: '' };
    parseCmdLineArgs(userInputs, display);
    assert(display.calledWith(cmdLineArgsInfo));
  });
});

describe('getCmdLineArgsInfo', function () {
  it('should give parsed command Line Arguments when -n option is given', function () {
    const cmdLineArgs = { error: '', noOfLines: '', filePath: '' };
    const noOfLine = 2;
    const file = 'file';
    const expected = { error: '', noOfLines: 2, filePath: 'file' };
    assert.deepStrictEqual(getCmdLineArgsInfo(cmdLineArgs, noOfLine, file), expected);
  });
});

describe('displayIllegalOpt', function () {
  it('should display error when called', function () {
    const display = sinon.fake();
    const firstCmdArg = '-b';
    const error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
    const cmdLineArgsInfo = { error: error, lines: '' };
    displayIllegalOpt(firstCmdArg, display);
    assert(display.calledWith(cmdLineArgsInfo));
  });
});

describe('performHead', function () {
  const readFile = function () {
    return 'fileContents';
  };

  const existsSync = function () {
    return true;
  };

  const display = function (output) {
    assert.equal(output.error, 'head: file1: No such file or directory');
    assert.equal(output.lines, '');
  };
  const fs = { readFile, existsSync };
  const process = {};
  it('should give the end result when standard input is not given', function () {
    const cmdLineArgs = ['file1'];
    const actual = performHead(cmdLineArgs, fs, process, display);
    const expected = undefined;
    assert.deepStrictEqual(actual, expected);
  });

  it('should give the end result when standard input is not given', function () {
    const display = sinon.fake();
    const existsSync = sinon.stub();
    const readFile = sinon.spy();
    const cmdLineArgs = ['-n', '2', 'file1'];
    const fs = { existsSync, readFile };
    const cmdLineArgsInfo = { error: 'head: file1: No such file or directory', lines: '' };
    performHead(cmdLineArgs, fs, display);
    assert(existsSync.calledWith('file1'));
    assert(display.calledWith(cmdLineArgsInfo));
    assert(existsSync.calledWith('file1'));
  });
});

describe('extractFirstNLines', function () {
  it('should give the default 10 elements if required number of lines is not given', function () {
    const fileContents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractFirstNLines(fileContents, 10), expected);
  });

  it('should give all elements if total number of elements are less than 10 required number of lines is not given', function () {
    const fileContents = ['1', '2', '3'];
    const expected = ['1', '2', '3'];
    assert.deepStrictEqual(extractFirstNLines(fileContents), expected);
  });
});

describe('stdInput', function () {
  it('should get standard input and display', function () {
    const noOfLines = 10;
    const display = function (output) {
      assert.equal(output.error, '');
      assert.equal(output.lines, 'file\nContents');
    };
    stdInput(null, 'file\nContents', { display, noOfLines });
  });

  it('should display an error while reading a file', function () {
    const noOfLines = 10;
    const display = sinon.fake();
    const error = 'file not present';
    const dataInfo = { error: 'file not present', lines: '' };
    stdInput(error, '', { display, noOfLines });
    assert(display.calledWith(dataInfo));
  });
});

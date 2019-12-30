const {
  extractFirstNLines,
  getCmdLineArgsInfo,
  displayIllegalOpt,
  parseCmdLineArgs,
  performHead,
  callback
} = require('../src/headOperation');
const { assert } = require('chai');
const sinon = require('sinon');

describe('parseCmdLineArgs', function () {
  it('should give the given file name and required number of lines in an object', () => {
    const display = sinon.fake();
    const userInputs = ['-n', '2', 'file1'];
    const expected = { error: '', filePath: 'file1', noOfLines: '2' };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs, display), expected);
  });

  it('should give the given file and the default number of lines required', () => {
    const display = sinon.fake();
    const userInputs = ['file1'];
    const expected = { error: '', filePath: 'file1', noOfLines: 10 };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs, display), expected);
  });

  it('should give an error of illegal option when given option is invalid', () => {
    const display = sinon.fake();
    const userInputs = ['-b', '2', 'file1'];
    const firstCmdArg = '-b';
    const error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
    const cmdLineArgsInfo = { error: error, lines: '' };
    assert.deepStrictEqual(parseCmdLineArgs(userInputs, display), cmdLineArgsInfo);
  });
});

describe('getCmdLineArgsInfo', function () {
  it('should give parsed command Line Arguments when -n option is given', () => {
    const cmdLineArgs = { error: '', noOfLines: '', filePath: '' };
    const noOfLine = 2;
    const file = 'file';
    const expected = { error: '', noOfLines: 2, filePath: 'file' };
    assert.deepStrictEqual(getCmdLineArgsInfo(cmdLineArgs, noOfLine, file), expected);
  });
});

describe('displayIllegalOpt', function () {
  it('should display error when called', () => {
    const display = sinon.fake();
    const firstCmdArg = '-b';
    const error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
    assert.deepStrictEqual(displayIllegalOpt(firstCmdArg, display), { error: error, lines: '' });
  });
});

describe('performHead', function () {
  it('should give error if file is not present', (done) => {
    const commandLineArgs = ['-n', '2', 'file1'];

    const display = result => {
      assert.strictEqual(result.error, 'head: file1: No such file or directory');
      assert.strictEqual(result.lines, '');
      done();
    };

    const readFile = sinon.fake();
    performHead(commandLineArgs, readFile, display);
    assert.equal(readFile.firstCall.args[0], 'file1');
    assert.equal(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2]({ code: 'ENOENT' }, null);
  });

  it('should display the lines if file is present', (done) => {
    const commandLineArgs = ['-n', '2', 'file1'];

    const display = result => {
      assert.strictEqual(result.error, '');
      assert.strictEqual(result.lines, 'file\nContents');
      done();
    };

    const readFile = sinon.fake();
    performHead(commandLineArgs, readFile, display);
    assert.equal(readFile.firstCall.args[0], 'file1');
    assert.equal(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2](null, 'file\nContents');
  });
});

it('should display the error or lines if file is not present', () => {
  const commandLineArgs = ['-b', '2', 'file1'];

  const display = result => {
    assert.strictEqual(result.error, 'head: illegal option -- b\nusage: head [-n lines | -c bytes] [file ...]');
    assert.strictEqual(result.lines, '');
  };

  const readFile = sinon.fake();
  performHead(commandLineArgs, readFile, display);
});


describe('extractFirstNLines', () => {
  it('should give the default 10 elements if required number of lines is not given', () => {
    const fileContents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractFirstNLines(fileContents, 10), expected);
  });

  it('should give all elements if total number of elements are less than 10 required number of lines is not given', () => {
    const fileContents = ['1', '2', '3'];
    const expected = ['1', '2', '3'];
    assert.deepStrictEqual(extractFirstNLines(fileContents), expected);
  });
});

describe('callback', () => {
  it('should get standard input and display', () => {
    const output = { error: '', lines: 'file\nContents' };
    assert.deepStrictEqual(callback(null, 'file\nContents', 2), output);
  });

  it('should display an error while reading a file', () => {
    const error1 = new Error('file not present');
    const dataInfo = { error: error1.message, lines: '' };
    assert.deepStrictEqual(callback(error1, ''), dataInfo);
  });
});

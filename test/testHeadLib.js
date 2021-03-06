const {
  extractFirstNLines,
  getIllegalOptMsg,
  performHead,
  loadFileContents
} = require('../src/headLib');
const { assert } = require('chai');
const sinon = require('sinon');

describe('getIllegalOptMsg', function () {
  it('should display error when called', () => {
    const display = sinon.fake();
    const firstCmdArg = '-b';
    const error = `head: illegal option -- ${firstCmdArg.slice(1)}\nusage: head [-n lines | -c bytes] [file ...]`;
    assert.deepStrictEqual(getIllegalOptMsg(firstCmdArg, display), { error: error, lines: '' });
  });
});

describe('performHead', function () {
  it('should give error if file is not present', () => {

    const display = result => {
      assert.strictEqual(result.error, 'head: file1: No such file or directory');
      assert.strictEqual(result.lines, '');
    };

    const readers = { createReadStream: sinon.fake.returns('file1'), stdin: { on: sinon.fake() }, pick: sinon.stub().withArgs('').returns({ on: sinon.fake() }) };
    const commandLineArgs = ['file1'];
    performHead(commandLineArgs, readers, display);
    assert.strictEqual(readers.pick('').on.firstCall.args[0], 'data');
    assert.strictEqual(readers.pick('').on.secondCall.args[0], 'error');
    readers.pick('').on.secondCall.args[1]({ code: 'ENOENT' });
    assert.ok(readers.pick.calledWithExactly(''));
  });

  it('should display the lines if file is present', () => {
    const display = result => {
      assert.strictEqual(result.error, '');
      assert.strictEqual(result.lines, '1\n2\n3');
    };

    const readers = { createReadStream: sinon.fake.returns({}), stdin: { on: sinon.fake() }, pick: sinon.stub().withArgs('').returns({ on: sinon.fake() }) };
    const commandLineArgs = [];
    performHead(commandLineArgs, readers, display);
    assert.strictEqual(readers.pick('').on.firstCall.args[0], 'data');
    assert.strictEqual(readers.pick('').on.secondCall.args[0], 'error');
    readers.pick('').on.firstCall.args[1]('1\n2\n3');

    assert.ok(readers.pick.calledWithExactly(''));
  });

  it('should display the error or lines if file is not present', () => {

    const display = result => {
      const errMsg1 = 'head: illegal option -- b\n';
      const errMsg2 = 'usage: head [-n lines | -c bytes] [file ...]';
      assert.strictEqual(result.error, errMsg1 + errMsg2);
      assert.strictEqual(result.lines, '');
    };

    const commandLineArgs = ['-b', '2', 'file1'];
    const createStream = sinon.fake();
    performHead(commandLineArgs, createStream, display);
  });

});

describe('extractFirstNLines', () => {
  it('should give the required lines', () => {
    const fileContents = '1\n2';
    const expected = '1';
    assert.deepStrictEqual(extractFirstNLines(fileContents, 1), expected);
  });

  it('should give all lines if number of required lines is greater than the total lines', () => {
    const fileContents = '1\n2';
    const expected = '1\n2';
    assert.deepStrictEqual(extractFirstNLines(fileContents, 3), expected);
  });
});

describe('loadFileContents', function () {
  it('should call onLoadComplete function when data event is fired', function () {
    const onLoadComplete = sinon.fake();
    const filePath = 'file1';
    const inputStream = { on: sinon.fake() };

    loadFileContents(inputStream, filePath, onLoadComplete);
    assert(inputStream.on.firstCall.calledWith('data'));
    inputStream.on.firstCall.args[1]('file1Contents');
    assert(onLoadComplete.calledWith('file1Contents'));
  });

  it('should call onLoadComplete function when error event of ENOENT code is fired', () => {
    const onLoadComplete = sinon.fake();
    const filePath = 'missingFile';
    const inputStream = { on: sinon.fake() };

    loadFileContents(inputStream, filePath, onLoadComplete);
    assert(inputStream.on.secondCall.calledWith('error'));
    inputStream.on.secondCall.args[1]({ code: 'ENOENT' });
    const error = `head: ${filePath}: No such file or directory`;
    assert(onLoadComplete.calledWith('', error));
  });

  it('should call onLoadComplete function when error event except ENOENT code is fired', () => {
    const onLoadComplete = sinon.fake();
    const filePath = 'missingFile';
    const inputStream = { on: sinon.fake() };

    loadFileContents(inputStream, filePath, onLoadComplete);
    assert(inputStream.on.secondCall.calledWith('error'));
    inputStream.on.secondCall.args[1]({ code: 'E', message: 'another error' });
    assert(onLoadComplete.calledWith('', 'another error'));
  });
});

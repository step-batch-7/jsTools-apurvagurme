const { getHeadLinesOrError, performHeadOperation } = require('../src/getHead');
const { assert } = require('chai');
const Head = require('../src/headLib');
const fs = require('fs');

describe('getHeadLinesOrError', function() {
  it('should give an error or the required headlines of the given file', function() {
    const expected = [console.error, 'head: file1: No such file or directory'];
    const userInput = ['-n', '2', 'file1'];
    assert.deepStrictEqual(
      getHeadLinesOrError(userInput, console.log, console.error),
      expected
    );
  });
});

describe('performHeadOperation', function() {
  it('should give the result of head operation', function() {
    const head = new Head();
    const operation = { lines: 'one\ntwo' };
    const actual = performHeadOperation(head, operation);
    assert.strictEqual(actual, 'one\ntwo');
  });
});

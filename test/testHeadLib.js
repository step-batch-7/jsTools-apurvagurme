const Head = require('../src/headLib.js');
const { assert } = require('chai');

describe('HEAD', function() {
  describe('getFileContents', function() {
    const head = new Head();
    const isExistFunc = function(path) {
      if (path === 'path') return true;
      return false;
    };

    const readFunc2 = function(path, encoding) {
      return '';
    };

    it('should read the contents of the file in the given path', function() {
      const path = 'otherPath';
      assert.throws(
        () => head.getFileContents(path, readFunc2, isExistFunc),
        `head: ${path}: No such file or directory`
      );
    });

    it('should read the contents of the file in the given path', function() {
      const path = 'path';
      assert.deepStrictEqual(
        head.getFileContents(path, readFunc2, isExistFunc),
        ''
      );
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

    it('should give all elements if total number of elements are less than 10 required number of lines is not given', function() {
      const head = new Head();
      const fileContents = ['1', '2', '3'];
      const expected = ['1', '2', '3'];
      assert.deepStrictEqual(head.extractFirstNLines(fileContents), expected);
    });
  });

  describe('formatLines', function() {
    it("should join the given elements with '\n'", function() {
      const head = new Head();
      const expected = 'one\ntwo';
      const array = ['one', 'two'];
      assert.strictEqual(head.formatLines(array), expected);
    });
  });

  describe('parseInput', function() {
    it('should give the userInputs', function() {
      const head = new Head();
      const userInputs = ['-n', '2', 'file1'];
      const expected = { filePath: ['file1'], numberOfLines: '2' };
      assert.deepStrictEqual(head.parseInput(userInputs), expected);
    });

    it('should give the userInputs', function() {
      const head = new Head();
      const userInputs = ['file1'];
      const expected = { filePath: ['file1'], numberOfLines: 10 };
      assert.deepStrictEqual(head.parseInput(userInputs), expected);
    });
  });
});

const Head = require('../src/headLib.js');
const { assert } = require('chai');
const fs = require('fs');
const { readFileSync, existsSync } = fs;

describe('HEAD', function() {
  describe('test Head class', function() {
    it('should give an instance of the head class in the expected format', function() {
      const head = new Head(readFileSync, existsSync, ['./file1']);
      assert.deepStrictEqual(head, {
        readFunc: fs.readFileSync,
        isExistFunc: fs.existsSync,
        filePath: ['./file1'],
        requiredNoOfLines: 10
      });
    });
  });

  describe('getFileContents', function() {
    it('should give error message if the given file is not present', function() {
      const path = 'path';
      const head = new Head(readFileSync, existsSync, path);
      assert.deepStrictEqual(head.getFileContents(path), {
        error: 'head: path: No such file or directory'
      });
    });

    it('should read the contents of the given file', function() {
      const path = 'path';
      const readFunc = function() {
        return 'fileContents';
      };

      const existsFunc = function() {
        return true;
      };

      const head = new Head(readFunc, existsFunc, path);
      assert.deepStrictEqual(head.getFileContents(path), {
        lines: 'fileContents'
      });
    });
  });

  describe('extractFirstNLines', function() {
    it('should give the default 10 elements if required number of lines is not given', function() {
      const path = 'path';
      const head = new Head(readFileSync, existsSync, path);
      const fileContents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      assert.deepStrictEqual(head.extractFirstNLines(fileContents), expected);
    });

    it('should give all elements if total number of elements are less than 10 required number of lines is not given', function() {
      const path = 'path';
      const head = new Head(readFileSync, existsSync, path);
      const fileContents = ['1', '2', '3'];
      const expected = ['1', '2', '3'];
      assert.deepStrictEqual(head.extractFirstNLines(fileContents), expected);
    });
  });
});

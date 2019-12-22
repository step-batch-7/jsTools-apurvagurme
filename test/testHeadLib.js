const parseInput = require('../src/headLib').parseInput;
const { assert } = require('chai');

describe('parseInput', function() {
  it('should give the userInputs', function() {
    const expected = { filenames: ['file1'] };
    assert.deepStrictEqual(parseInput(['file1']), expected);
  });
});

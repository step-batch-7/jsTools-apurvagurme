const { assert } = require('chai');
const StreamPicker = require('../src/streamLib');
const sinon = require('sinon');

describe('STREAMPICKER', function () {
  describe('pick', function () {
    let createReadStream, stdin, streamPicker;
    beforeEach(() => {
      createReadStream = sinon.fake.returns({});
      stdin = {};
      streamPicker = new StreamPicker(createReadStream, stdin);
    });

    it('description of test', function () {
      assert.deepStrictEqual(streamPicker.pick('file1'), {});
    });
    it('description of test', function () {
      assert.deepStrictEqual(streamPicker.pick(), {});
    });
  });
});

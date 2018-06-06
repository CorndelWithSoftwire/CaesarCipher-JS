const crypt = require('../src/crypt');
const assert = require('assert');

describe('#encrypt', function () {
  it('shifts each letter', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, 1);
    assert.equal(result, 'bcde');
  });

  it('shifts by the given amount', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, 12);
    assert.equal(result, 'mnop');
  });

  it('returns the original message when shifted by zero', function () {
    const message = 'somemessage';
    const result = crypt.encrypt(message, 0);
    assert.equal(result, 'somemessage');
  });

  it('ignore non-alphabetic characters', function () {
    const message = 'a b_c-d';
    const result = crypt.encrypt(message, 1);
    assert.equal(result, 'b c_d-e');
  });

  // TODO: Test rotation
  // TODO: Test case-sensitivity
});

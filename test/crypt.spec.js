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

  it('rotates characters from the end of the alphabet', function () {
    assert.equal(crypt.encrypt('xyz', 3), 'abc');
  });

  it('converts to lower case', function () {
    assert.equal(crypt.encrypt('AbC', 1), 'bcd');
  });

  it('shifts by a negative value', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, -2);
    assert.equal(result, 'yzab');
  });

  it('shifts by a very large value', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, 26001);
    assert.equal(result, 'bcde');
  });

  it('shifts by a very large negative value', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, -26001);
    assert.equal(result, 'zabc');
  });
});

describe('#decrypt', function () {
  it('shifts by the given amount', function () {
    const message = 'mnop';
    const result = crypt.decrypt(message, 12);
    assert.equal(result, 'abcd');
  });

  it('rotates characters from the start of the alphabet', function ()  {
    assert.equal(crypt.decrypt('abc', 3), 'xyz');
  });

  it('converts to lower case', function () {
    assert.equal(crypt.decrypt('BcD', 1), 'abc');
  });
});

const crypt = require('../src/crypt');
const assert = require('assert');

describe('#encrypt', function () {
  it('shifts each letter', function () {
    const message = 'abcd';
    const result = crypt.encrypt(message, 1);
    assert.equal(result, 'bcde');
  });
});

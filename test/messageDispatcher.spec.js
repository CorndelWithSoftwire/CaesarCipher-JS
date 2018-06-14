require('mocha-sinon');
const assert = require('assert');

const messageDispatcher = require('../src/message_dispatcher');
const apiClient = require('../src/api_client');
const crypt = require('../src/crypt');

// Preview message instead

describe('#preview', function () {
  // Use real crypt function
  it('previews the encrypted message', function () {
    const preview = messageDispatcher.preview('abcd', 4);
    assert.equal(preview, 'efgh');
  });

  // Use stubbed crypt function
  it('previews the encrypted message', function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('abcd', 4).returns('an encrypted message');

    const preview = messageDispatcher.preview('abcd', 4);
    assert.equal(preview, 'an encrypted message');
  });
});

describe('#send', function () {
  // Use real crypt function
  it('sends an encrypted message', function () {
    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send').withArgs('bcde', 'alice');

    messageDispatcher.send('abcd', 'alice', 1);

    mockApiClient.verify();
  });

  // Use stubbed crypt function
  it('sends an encrypted message', function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('abcd', 8).returns('some encrypted message');

    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send').withArgs('some encrypted message', 'alice');

    messageDispatcher.send('abcd', 'alice', 8);

    mockApiClient.verify();
  });
});

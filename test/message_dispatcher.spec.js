require('mocha-sinon');
const assert = require('assert');

const messageDispatcher = require('../src/message_dispatcher');
const apiClient = require('../src/api_client');
const crypt = require('../src/crypt');

describe('#preview', function () {
  it('previews the encrypted message', function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('abcd', 4).returns('an encrypted message');

    const preview = messageDispatcher.preview('abcd', 4);
    assert.equal(preview, 'an encrypted message');
  });
});

describe('#send', function () {
  it('sends an encrypted message', async function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('original message', 8).returns('some encrypted message');

    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send')
      .withArgs('some encrypted message', 'alice')
      .returns({id: 1234});

    const response = await messageDispatcher.send('original message', 'alice', 8);

    assert.equal(response, 1234);
    mockApiClient.verify();
  });
});

require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const messageDispatcher = require('../src/message_dispatcher');
const apiClient = require('../src/api_client');
const crypt = require('../src/crypt');

describe('#preview', function () {
  it('previews the encrypted message', function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('abcd', 4).returns('an encrypted message');

    const preview = messageDispatcher.preview('abcd', 4);
    expect(preview).to.equal('an encrypted message');
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

    await messageDispatcher.send('original message', 'alice', 8);

    mockApiClient.verify();
  });
});

describe('#fetch', function () {
  it('fetches and decrypts messages', async function () {
    const decrypt = this.sinon.stub(crypt, 'decrypt');
    decrypt.withArgs('encrypted message', 9).returns('decrypted message');

    const messageFetcher = this.sinon.stub(apiClient, 'fetch');
    const message = {
      userId: 2,
      body: 'encrypted message'
    };
    messageFetcher.returns(message);

    const response = await messageDispatcher.fetch(9);

    expect(response).to.deep.equal({user: 2, body: 'decrypted message'});
  });
});

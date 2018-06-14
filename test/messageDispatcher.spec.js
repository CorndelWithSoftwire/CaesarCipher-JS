require('mocha-sinon');

const messageDispatcher = require('../src/message_dispatcher');
const apiClient = require('../src/api_client');
const crypt = require('../src/crypt');

// Preview message instead

describe('#send', function () {
  // Use real crypt function
  it('sends an encrypted message', function () {
    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send').withArgs('bcde', 'alice');

    messageDispatcher.send('abcd', 'alice', 1);

    mockApiClient.verify();
  });

  // Use stub crypt function
  it('sends an encrypted message to the API', function () {
    const encrypt = this.sinon.stub(crypt, 'encrypt');
    encrypt.withArgs('abcd', 8).returns('some encrypted message');

    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send').withArgs('some encrypted message', 'alice');

    messageDispatcher.send('abcd', 'alice', 8);

    mockApiClient.verify();
  });
});

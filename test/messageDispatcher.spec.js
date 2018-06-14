require('mocha-sinon');

const messageDispatcher = require('../src/message_dispatcher');
const apiClient = require('../src/api_client');

// Preview message instead

describe('#send', function () {
  it('sends an encrypted message', function () {
    const mockApiClient = this.sinon.mock(apiClient);
    mockApiClient.expects('send').withArgs('bcde', 'alice');

    messageDispatcher.send('abcd', 'alice', 1);

    mockApiClient.verify();
  });
});

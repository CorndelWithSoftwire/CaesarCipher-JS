require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const controller = require('../src/controller');
const messageDispatcher = require('../src/message_dispatcher');

describe('preview message', function () {
  it('returns a message preview', async function () {
    const previewer = this.sinon.stub(messageDispatcher, 'preview');
    previewer.withArgs('Some message', 5).returns('An encrypted message');

    const response = await controller.sendCommand('preview message 5 Some message');

    expect(response).to.equal('An encrypted message');
  });
});

describe('send message', function () {
  it('sends a message', async function () {
    const mockDispatcher = this.sinon.mock(messageDispatcher);
    mockDispatcher.expects('send').withArgs('Some message', 'alice', 7);

    const response = await controller.sendCommand('send message alice 7 Some message');

    mockDispatcher.verify();
    expect(response).to.equal('message sent');
  });
});

describe('check messages', function () {
  it('returns notice about no messages', async function () {
    const messageFetcher = this.sinon.stub(messageDispatcher, 'fetch');
    messageFetcher.withArgs(5).returns(null);

    const response = await controller.sendCommand('check messages 5');

    expect(response).to.equal('no messages');
  });

  it('fetches messages', async function () {
    const messageFetcher = this.sinon.stub(messageDispatcher, 'fetch');
    messageFetcher.withArgs(11).returns({user: 3, body: 'a fetched message'});

    const response = await controller.sendCommand('check messages 11');

    expect(response).to.equal('user 3: a fetched message');
  });
});

describe('unknown command', function () {
  it('handles unknown commands', async function () {
    const response = await controller.sendCommand('not a real command');

    expect(response).to.equal('Unknown command "not a real command"');
  });
});

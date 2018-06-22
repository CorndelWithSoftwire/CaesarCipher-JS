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

    await controller.sendCommand('send message alice 7 Some message');

    mockDispatcher.verify();
  });
});

describe('unknown command', function () {
  it('handles unknown commands', async function () {
    const response = await controller.sendCommand('not a real command');

    expect(response).to.equal('Unknown command "not a real command"');
  });
});

require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const controller = require('../src/controller');
const messageDispatcher = require('../src/message_dispatcher');

describe('preview message', function () {
  it('returns a message preview', function () {
    const previewer = this.sinon.stub(messageDispatcher, 'preview');
    previewer.withArgs('Some message', 5).returns('An encrypted message');

    const response = controller.sendCommand('preview message 5 Some message');

    expect(response).to.equal('An encrypted message');
  });
});

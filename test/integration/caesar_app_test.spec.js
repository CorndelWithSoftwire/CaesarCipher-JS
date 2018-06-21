const chai = require('chai');
const expect = chai.expect;

const controller = require('../../src/controller');

describe('caesar cipher app', function () {
  it('previews a message', function () {
    const response = controller.sendCommand('preview message 10 This is a message');
    expect(response).to.equal('drsc sc k wocckqo');
  });
});

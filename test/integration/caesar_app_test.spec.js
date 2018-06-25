const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const controller = require('../../src/controller');

describe('caesar cipher app', function () {
  it('previews a message', async function () {
    const response = await controller.sendCommand('preview message 10 This is a message');
    expect(response).to.equal('drsc sc k wocckqo');
  });

  it('sends a message', async function () {
    const apiResponse = JSON.stringify({ id: 56 });
    const messageApi = nock('https://jsonplaceholder.typicode.com')
      .post('/posts', {
        userId: 'bob',
        body: 'z ldrrzfd enq ana'
      })
      .reply(200, apiResponse);

    const response = await controller.sendCommand('send message bob 25 A message for Bob');

    expect(response).to.equal('message sent');
    messageApi.done();
  });

  it('receives messages', async function () {
    const apiResponse = {
      userId: 5,
      body: 'mz uzoayuzs yqeemsq'
    };
    nock('https://jsonplaceholder.typicode.com')
      .get(/\/posts\/\d+/)
      .reply(200, apiResponse);

    const response = await controller.sendCommand('check messages 12');

    expect(response).to.equal('user 5: an incoming message');
  });
});

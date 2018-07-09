const { Given, When, Then, BeforeAll } = require('cucumber');
const { expect } = require('chai');
const nock = require('nock');

BeforeAll(function () {
  nock.disableNetConnect();
});

When('I preview the message {string} with shift {int}', async function (message, shift) {
  this.previewedMessage = await this.controller.sendCommand(`preview message ${shift} ${message}`);
});

When('I send the message {string} to {string} with shift {int}', async function (message, recipient, shift) {
  const context = this;

  this.messageApi = nock('https://jsonplaceholder.typicode.com')
    .post('/posts', function (body) {
      context.messageBody = body;
      return true;
    })
    .reply(200, {});

  await this.controller.sendCommand(`send message ${recipient} ${shift} ${message}`);
});

Then('I see the preview {string}', function (encryptedMessage) {
  expect(this.previewedMessage).to.eq(encryptedMessage);
});

Then('the encrypted message {string} should be sent to {string}', function (encryptedMessage, recipient) {
  expect(this.messageBody.userId).to.eq(recipient);
  expect(this.messageBody.body).to.eq(encryptedMessage);
});

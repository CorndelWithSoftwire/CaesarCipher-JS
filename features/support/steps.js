const { Given, When, Then, BeforeAll } = require('cucumber');
const { expect } = require('chai');
const nock = require('nock');

BeforeAll(function () {
  nock.disableNetConnect();
});

Given('{string} has sent me the message {string}', function (sender, message) {
  const apiResponseBody = {
    userId: sender,
    body: message
  };
  nock('https://jsonplaceholder.typicode.com')
    .get(/\/posts\/\d+/)
    .reply(200, apiResponseBody);

  this.sender = sender;
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

When('I check my messages with shift {int}', async function (shift) {
  this.receivedMessage = await this.controller.sendCommand(`check messages ${shift}`);
});

Then('I see the preview {string}', function (encryptedMessage) {
  expect(this.previewedMessage).to.eq(encryptedMessage);
});

Then('the encrypted message {string} should be sent to {string}', function (encryptedMessage, recipient) {
  expect(this.messageBody.userId).to.eq(recipient);
  expect(this.messageBody.body).to.eq(encryptedMessage);
});

Then('I should receive the message {string}', function (message) {
  expect(this.receivedMessage).to.eq(`user ${this.sender}: ${message}`);
});

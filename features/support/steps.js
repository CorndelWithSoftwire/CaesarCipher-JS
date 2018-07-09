const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

When('I preview the message {string} with shift {int}', async function (message, shift) {
  this.previewedMessage = await this.controller.sendCommand(`preview message ${shift} ${message}`);
});

Then('I see the preview {string}', function (encryptedMessage) {
  expect(this.previewedMessage).to.eq(encryptedMessage);
});

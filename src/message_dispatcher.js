const apiClient = require('./api_client');
const crypt = require('./crypt');

exports.send = function (message, recipient, shift) {
  const encryptedMessage = crypt.encrypt(message, shift);
  apiClient.send(encryptedMessage, recipient);
};

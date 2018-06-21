const apiClient = require('./api_client');
const crypt = require('./crypt');

exports.preview = function (message, shift) {
  return crypt.encrypt(message, shift);
};

exports.send = async function (message, recipient, shift) {
  const encryptedMessage = crypt.encrypt(message, shift);
  const response = await apiClient.send(encryptedMessage, recipient);
  return response.id;
};

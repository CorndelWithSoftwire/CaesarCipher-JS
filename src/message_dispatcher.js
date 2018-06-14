const apiClient = require('./api_client');

exports.send = function (message, recipient, shift) {
  apiClient.send('bcde', recipient);
};

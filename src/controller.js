const messageDispatcher = require('./message_dispatcher');

function previewMessage(command) {
  const regex = /preview message (\d+) (.*)/;
  const matches = command.match(regex);
  const shift = parseInt(matches[1]);
  const message = matches[2];

  return messageDispatcher.preview(message, shift);
}

exports.sendCommand = function (command) {
  return previewMessage(command);
};

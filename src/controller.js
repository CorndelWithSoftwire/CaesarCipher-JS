const messageDispatcher = require('./message_dispatcher');

function previewMessage(command) {
  const regex = /preview message (\d+) (.*)/;
  const matches = command.match(regex);
  const shift = parseInt(matches[1]);
  const message = matches[2];

  return messageDispatcher.preview(message, shift);
}

function sendMessage(command) {
  const regex = /send message (\w+) (\d+) (.*)/;
  const matches = command.match(regex);
  const recipient = matches[1];
  const shift = parseInt(matches[2]);
  const message = matches[3];

  return messageDispatcher.send(message, recipient, shift);
}

exports.sendCommand = function (command) {
  if (command.startsWith('preview message')) {
    return previewMessage(command);
  } else if (command.startsWith('send message')) {
    return sendMessage(command);
  }
  return `Unknown command "${command}"`;
};

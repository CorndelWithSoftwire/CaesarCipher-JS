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

async function checkMessages(command) {
  const regex = /check messages (\d+)/;
  const matches = command.match(regex);
  const shift = parseInt(matches[1]);

  const message = await messageDispatcher.fetch(shift);

  if (message) {
    return `user ${message.user}: ${message.body}`;
  }

  return 'no messages';
}

exports.sendCommand = async function (command) {
  if (command.startsWith('preview message')) {
    return previewMessage(command);
  } else if (command.startsWith('send message')) {
    // TODO: Is await actually necessary on return?
    return await sendMessage(command);
  } else if (command.startsWith('check messages')) {
    return await checkMessages(command);
  }
  return `Unknown command "${command}"`;
};

const ApiError = require('./api_error');
const messageDispatcher = require('./message_dispatcher');

function previewMessage(command) {
  const regex = /preview message (\d+) (.*)/;
  const matches = command.match(regex);
  const shift = parseInt(matches[1]);
  const message = matches[2];

  return messageDispatcher.preview(message, shift);
}

async function sendMessage(command) {
  const regex = /send message (\w+) (\d+) (.*)/;
  const matches = command.match(regex);
  const recipient = matches[1];
  const shift = parseInt(matches[2]);
  const message = matches[3];

  try {
    await messageDispatcher.send(message, recipient, shift);
    return 'message sent';
  } catch (e) {
    if (e instanceof ApiError) {
      return `failed to send message: ${e.message}`;
    }
    throw e;
  }
}

async function checkMessages(command) {
  const regex = /check messages (\d+)/;
  const matches = command.match(regex);
  const shift = parseInt(matches[1]);

  try {
    const message = await messageDispatcher.fetch(shift);

    if (message) {
      return `user ${message.user}: ${message.body}`;
    }

    return 'no messages';
  } catch (e) {
    if (e instanceof ApiError) {
      return `failed to fetch messages: ${e.message}`;
    }
    throw e;
  }
}

exports.sendCommand = async function (command) {
  if (command.startsWith('preview message')) {
    return previewMessage(command);
  } else if (command.startsWith('send message')) {
    return sendMessage(command);
  } else if (command.startsWith('check messages')) {
    return checkMessages(command);
  }
  return `Unknown command "${command}"`;
};

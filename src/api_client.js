const ApiError = require('./api_error');
const fetch = require('node-fetch');

exports.send = async function (message, recipient) {
  const postBody = {
    userId: recipient,
    body: message
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postBody)
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', options);
  if (response.status >= 400) {
    throw new ApiError(`Could not send message. Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

exports.fetch = async function () {
  const postId = randomPostId();
  return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json());
};

function randomPostId () {
  const min = 1;
  const max = 100;
  return Math.floor(Math.random() * (max - min)) + min;
}

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

  return await fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then(res => res.json());
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

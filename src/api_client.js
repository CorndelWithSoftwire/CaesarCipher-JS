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

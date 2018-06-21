const fetch = require('node-fetch');

exports.send = async function (message, recipient) {
  const options = {
    method: 'POST',
    body: {}
  };

  return await fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then(res => res.json());
};

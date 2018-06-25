# Caesar Cipher messaging app

This is a simple example app to show how integration tests can be used to test
an app end-to-end, while using test doubles for external dependencies like API
calls.

It is a command-line application for sending and receiving messages encrypted
using a [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

This is a toy app that cannot be used for sending real messages - it calls a
[placeholder API](https://jsonplaceholder.typicode.com/) rather than a real
messaging backend. And in any case, the Caesar cipher is [extremely easy to
break](https://en.wikipedia.org/wiki/Caesar_cipher#Breaking_the_cipher) and
shouldn't be used for real encryption!

To set up the app, clone it and run:

```
npm install
```

To run the tests:

```
npm test
```

To run the app:

```
node index.js
```

The app lists the available commands. `send message` and `check messages` will
post and fetch some JSON to and from a dummy API endpoint (see above).

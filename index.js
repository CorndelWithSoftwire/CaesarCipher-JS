const controller = require('./src/controller');
const readline = require('readline');

console.log(`Welcome to the Caesar encryption app
===================================

Commands:
- preview message <shift> <message>
  Example:
  preview message 12 This is a totes sekrit message

- send message <recipient> <shift> <message>
  Example:
  send message alice 4 A message for Alice's eyes only

- check messages <shift>
  Example:
  check messages 23

- quit
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'enter command> '
});

rl.prompt();

rl.on('line', (command) => {
  switch (command) {
    case 'quit':
      console.log('Bye! ^_^');
      process.exit(0);
      break;
    default:
      const response = controller.sendCommand(command);
      if (response) {
        console.log(response);
      }
  }

  rl.prompt();
}).on('close', () => {
  console.log('Bye! ^_^');
  process.exit(0);
});

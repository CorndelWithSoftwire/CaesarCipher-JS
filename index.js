const controller = require('./src/controller');
const readline = require('readline-sync');

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

let appIsRunning = true;

while (appIsRunning) {
  const command = readline.prompt();

  if (command === 'quit') {
    appIsRunning = false;
  } else {
    const response = controller.sendCommand(command);
    if (response) {
      console.log(response);
    }
  }
}

const { setWorldConstructor } = require('cucumber');

const controller = require('../../src/controller');

class GameWorld {
  constructor () {
    this.controller = controller;
  }
}

setWorldConstructor(GameWorld);

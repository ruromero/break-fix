const fs = require('fs');
const path = require('path');
const Encryptor = require('./encryptor');

const CONFIG_FILE = '../static/configuration.json';
const LEVELS = "levels",
      HASH = "hash";
const ID = "id",
      NAME = "name",
      TIME = "time",
      BONUS = "bonus",
      BREAK = "break",
      FIX = "fix"
      COMMANDS = "commands",
      WAIT_UNTIL = "waitUntil",
      COMMAND = "command",
      EXPECTATION = "expectation";

let config;
let game;

function loadConfigFile() {
  fs.readFile(path.join(__dirname, CONFIG_FILE), 'utf8', function(err, data) {
    if(err) {
      throw new Error('Unable to load configuration file.\n' + err);
    }
    config = JSON.parse(data);
    console.log("Game configuration loaded from file");
    createGame();
  });
}

function createGame() {
  game = {
    levels: []
  };
  for(let level of config.levels) {
    game.levels.push({
      id: level.id,
      name: level.name,
      time: level.time,
      bonus: level.bonus
    });
  }
}

loadConfigFile();

function getLevel(id) {
  for(let level of config[LEVELS]) {
    if (level[ID] === id) {
      return level;
    }
  }
}

exports.getConfiguration = () => {
  return config;
}

exports.getBreakConfig = (levelId, key) => {
  const level = getLevel(levelId);
  return Encryptor.decryptCommands(level[BREAK], key);
};

exports.getFixConfig = (levelId, key) => {
  const level = getLevel(levelId);
  return Encryptor.decryptCommands(level[FIX], key);
};

exports.getGame = () => {
  return game;
};

exports.validatePassword = (password) => {
  return Encryptor.validatePassword(password, config.hash);
}

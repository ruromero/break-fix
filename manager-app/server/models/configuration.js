const fs = require('fs');
const path = require('path');
const Encryptor = require('./encryptor');

const CONFIG_FILE = '../static/configuration.json';
const LEVELS = "levels",
      HASH = "hash";

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
    levels: [],
    maxScore: config.maxScore
  };
  for(let level of config.levels) {
    game.levels.push({
      id: level.id,
      name: level.name,
      maxScore: level.maxScore,
      bonus: level.bonus
    });
  }
}

loadConfigFile();

function getLevel(id) {
  for(let level of config.levels) {
    if (level.id === id) {
      return level;
    }
  }
}

exports.getConfiguration = () => {
  return config;
}

exports.getBreakConfig = (levelId, key) => {
  const level = getLevel(levelId);
  return Encryptor.decryptCommands(level.break, key);
};

exports.getFixConfig = (levelId, key) => {
  const level = getLevel(levelId);
  return Encryptor.decryptCommands(level.fix, key);
};

exports.getGame = () => {
  return game;
};

exports.validatePassword = (password) => {
  return Encryptor.validatePassword(password, config.hash);
}

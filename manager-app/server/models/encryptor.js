const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const LEVEL = 'level_';
const BREAK = 'break';
const CHECK = 'check';
const FIX = 'fix';
const LEVELS_FILE = 'oc_levels.json';

let levels;

function loadCommands() {
  fs.readFile(path.join(__dirname, '../static/' + LEVELS_FILE), 'utf8', function(err, data) {
    if(err) {
      throw new Error('Unable to load levels file.\n' + err);
    }
    levels = JSON.parse(data);
    console.log("Configuration loaded from file");
  });
}

loadCommands();

function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  if(bytes == '') {
    throw new Error('Invalid key or missing commands for path: ' + text);
  } else {
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText.split('\n');
  }
}

function decryptLevel(level, action, key) {
  let result = {
    commands: decrypt(levels['level_' + level][action].commands, key)
  };
  if(levels['level_' + level][action].waitUntil !== undefined) {
    result.waitUntil = {
      command: decrypt(levels['level_' + level][action].waitUntil.command, key),
      expectation: decrypt(levels['level_' + level][action].waitUntil.expectation, key)
    };
  }
  return result;
}

function encrypt (text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

exports.decryptBreakLevel = (level, key) => {
  return decryptLevel(level, BREAK, key);
};

exports.decryptFixLevel = (level, key) => {
  return decryptLevel(level, FIX, key);
};


exports.encrypt = encrypt;

exports.validatePassword = (password) => {
  return levels.hash === CryptoJS.SHA256(password).toString();
};


exports.encryptFile = (config, key) => {
  let result = {};
  for(let parameter in config) {
    if(parameter.startsWith('level_')) {
      const src = config[parameter];
      let level = {
        break: {
          commands: encrypt(src.break.commands, key)
        },
        fix: {
          commands: encrypt(src.fix.commands, key)
        }
      };
      for(let arg of ["break", "fix"]) {
        if(src[arg].waitUntil !== undefined) {
          level[arg].waitUntil = {
            command: encrypt(src[arg].waitUntil.command, key),
            expectation: encrypt(src[arg].waitUntil.expectation, key),
          };
        }
      }
      result[parameter] = level;
    }
  }
  result.hash = config.hash;
  return result;
};

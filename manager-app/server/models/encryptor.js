const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const OC_COMMANDS = 'oc_commands';
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
  });
}

loadCommands();

function decrypt(level, action, key, callbackFn, errorCallbackFn) {
  const bytes = CryptoJS.AES.decrypt(levels['level_' + level][action], key);
  if(bytes == '') {
    errorCallbackFn('No output. Is it the right key?');
  } else {
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    callbackFn(plainText.split('\n'));
  }
}

exports.decryptBreakLevel = function(level, key, callbackFn, errorCallbackFn) {
  decrypt(level,BREAK, key, callbackFn, errorCallbackFn);
}

exports.decryptFixLevel = function(level, key, callbackFn, errorCallbackFn) {
  decrypt(level, FIX, key, callbackFn, errorCallbackFn);
}

exports.encrypt = function(text, key) {
  return CryptoJS.AES.encrypt(text, key);
};

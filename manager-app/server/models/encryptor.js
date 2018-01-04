const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const OC_COMMANDS = 'oc_commands';
const LEVEL = 'level_';
const BREAK = 'break';
const CHECK = 'check';
const ROLLBACK = 'rollback';

function decrypt(fileName, key, callback, errorCallback) {
  fs.readFile(path.join(__dirname, fileName), 'utf8', function(err, data) {
    if (err) {
      errorCallback(err);
    } else {
      const bytes = CryptoJS.AES.decrypt(data.toString(), key);
      if(bytes == '') {
        errorCallback('No output. Is it the right key?');
      } else {
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        callback(plainText);
      }
    }
  });
}

function generateFileName(command, level) {
  return '../static/' + OC_COMMANDS + '/' + LEVEL + level + '/' + command;
}

exports.decryptBreakLevel = function(level, key, callback, errorCallback) {
  decrypt(generateFileName(BREAK, level), key, callback, errorCallback);
}

exports.decryptCheckLevel = function(level, key, callback, errorCallback) {
  decrypt(generateFileName(CHECK, level), key, callback, errorCallback);
}

exports.decryptRollbackLevel = function(level, key, callback, errorCallback) {
  decrypt(generateFileName(ROLLBACK, level), key, callback, errorCallback);
}

exports.encrypt = function(text, key) {
  return CryptoJS.AES.encrypt(text, key);
};

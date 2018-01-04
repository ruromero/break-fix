const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const OC_COMMANDS = 'oc_commands';
const LEVEL = 'level_';
const BREAK = 'break';
const CHECK = 'check';
const ROLLBACK = 'rollback';

function decrypt(fileName, key, callback) {
  fs.readFile(path.join(__dirname, fileName), 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      callback('');
    } else {
      const bytes = CryptoJS.AES.decrypt(data.toString(), key);
      const plainText = bytes.toString(CryptoJS.enc.Utf8);
      callback(plainText);
    }
  });
}

function generateFileName(command, level) {
  return '../static/' + OC_COMMANDS + '/' + LEVEL + level + '/' + command;
}

exports.decryptBreakLevel = function(level, key, callback) {
  decrypt(generateFileName(BREAK, level), key, callback);
}

exports.decryptCheckLevel = function(level, key, callback) {
  decrypt(generateFileName(CHECK, level), key, callback);
}

exports.decryptRollbackLevel = function(level, key, callback) {
  decrypt(generateFileName(ROLLBACK, level), key, callback);
}

exports.encrypt = function(text, key, callback) {
  const cryptedText = CryptoJS.AES.encrypt(text, key);
  callback(cryptedText);
};

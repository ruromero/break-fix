const CryptoJS = require('crypto-js');
const fs = require('fs');

const OC_COMMANDS = 'oc_commands';
const LEVEL = 'level_';
const BREAK = 'break';
const CHECK = 'check';
const ROLLBACK = 'rollback';

function decrypt(encryptedText, key) {
  fs.readFile(fileName, 'utf8', function(err, data) {
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
  return OC_COMMANDS + '/' + LEVEL + level + '/' + command;
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

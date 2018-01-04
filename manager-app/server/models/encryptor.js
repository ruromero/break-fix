const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const OC_COMMANDS = 'oc_commands';
const LEVEL = 'level_';
const BREAK = 'break';
const CHECK = 'check';
const ROLLBACK = 'rollback';

function decrypt(fileName, key, callbackFn, errorCallbackFn) {
  fs.readFile(path.join(__dirname, fileName), 'utf8', function(err, data) {
    if (err) {
      errorCallbackFn(err);
    } else {
      const bytes = CryptoJS.AES.decrypt(data.toString(), key);
      if(bytes == '') {
        errorCallbackFn('No output. Is it the right key?');
      } else {
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        callbackFn(plainText);
      }
    }
  });
}

function generateFileName(command, level) {
  return '../static/' + OC_COMMANDS + '/' + LEVEL + level + '/' + command;
}

exports.decryptBreakLevel = function(level, key, callbackFn, errorCallbackFn) {
  decrypt(generateFileName(BREAK, level), key, callbackFn, errorCallbackFn);
}

exports.decryptCheckLevel = function(level, key, callbackFn, errorCallbackFn) {
  decrypt(generateFileName(CHECK, level), key, callbackFn, errorCallbackFn);
}

exports.decryptRollbackLevel = function(level, key, callbackFn, errorCallbackFn) {
  decrypt(generateFileName(ROLLBACK, level), key, callbackFn, errorCallbackFn);
}

exports.encrypt = function(text, key) {
  return CryptoJS.AES.encrypt(text, key);
};

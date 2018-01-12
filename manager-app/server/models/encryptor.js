const CryptoJS = require('crypto-js');

function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  if(bytes == '') {
    throw new Error('Invalid key or missing commands for path: ' + text);
  } else {
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText.split('\n');
  }
}

exports.decryptCommands = (action, key) => {
  let result = {
    commands: decrypt(action.commands, key)
  };
  if(action.waitUntil !== undefined) {
    result.waitUntil = {
      command: decrypt(action.waitUntil.command, key),
      expectation: decrypt(action.waitUntil.expectation, key)
    };
  }
  return result;
}

exports.encrypt = (text, key) => {
  CryptoJS.AES.encrypt(text, key).toString();
};

exports.validatePassword = (password, hash) => {
  return CryptoJS.SHA256(password).toString() === hash;
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
  result.hash = CryptoJS.SHA256(key).toString();
  return result;
};

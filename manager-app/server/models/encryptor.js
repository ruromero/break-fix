const CryptoJS = require('crypto-js');

function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText.split('\n');
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
  return CryptoJS.AES.encrypt(text, key).toString();
};

exports.validatePassword = (password, hash) => {
  return CryptoJS.SHA256(password).toString() === hash;
};

exports.encryptFile = (config, key) => {
  let result = {
    hash: CryptoJS.SHA256(key).toString(),
    maxScore: config.maxScore,
    levels: []
  };
  for(let cfgLevel of config.levels) {
    let level = {
      id: cfgLevel.id,
      name: cfgLevel.name,
      maxScore: cfgLevel.maxScore,
      bonus: cfgLevel.bonus,
      break: {},
      fix: {}
    };
    for(let arg of ["break", "fix"]) {
      level[arg].commands = this.encrypt(cfgLevel[arg].commands, key);
      if(cfgLevel[arg].waitUntil !== undefined) {
        level[arg].waitUntil = {
          command: this.encrypt(cfgLevel[arg].waitUntil.command, key),
          expectation: this.encrypt(cfgLevel[arg].waitUntil.expectation, key)
        };
      }
    }
    result.levels.push(level);
  }
  return result;
};

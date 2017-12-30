const Encryptor = require('encryptor');

function runCommand(command) {
  console.log('running command: %s', command);
}

exports.break = function(level, key) {
  Encryptor.decryptBreakLevel(level, key, function(command) {
    runCommand(command);
  })
}

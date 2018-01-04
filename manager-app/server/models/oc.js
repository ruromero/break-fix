const shell = require('shelljs')
const fs = require('fs');

function loadToken(callbackFn) {
  if(process.env.PWD !== undefined) {
    return fs.readFileSync(process.env.PWD + '/token', 'utf8');
  } else {
    throw new Error('Missing required TOKEN. Check that the ServiceAccount is properly defined');
  }
}

const TOKEN = loadToken();

exports.run = function(command, callbackFn, errorCallbackFn) {
  const oc_command = command + ' --token=' + TOKEN;
  shell.exec(oc_command, {silent: true}, (code, stdout, stderr) => {
    if(code == 0) {
      callbackFn(stdout);
    } else {
      errorCallbackFn(stderr);
    }
  });
};

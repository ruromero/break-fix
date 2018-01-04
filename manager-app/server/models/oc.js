const shell = require('shelljs')
const fs = require('fs');

function loadToken(callbackFn) {
  try {
    return fs.readFileSync('/run/secrets/kubernetes.io/token', 'utf8');
  } catch (error) {
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

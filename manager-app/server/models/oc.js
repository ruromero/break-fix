const shell = require('shelljs')
const fs = require('fs');

function loadToken() {
  try {
    return fs.readFileSync('/run/secrets/kubernetes.io/serviceaccount/token', 'utf8');
  } catch (error) {
    throw new Error('Missing required TOKEN. Check that the ServiceAccount is properly defined.\n' + error);
  }
}

const TOKEN = loadToken();

exports.run = function(commands) {
  for(let i = 0; i < commands.length; i++) {
    const oc_command = commands[i] + ' --token=' + TOKEN;
    const result = shell.exec(oc_command, {silent: true});
    if(result.code !== 0) {
      console.log('Unable to run command[%d]. Error: %s', result.code, result.stderr);
      return false;
    }
  }
  return true;
};

exports.getDemoAppRoute = function() {
  return shell.exec("oc get route -n myproject demoapp -o jsonpath='{.spec.host}'", {silent: true}).stdout;
}

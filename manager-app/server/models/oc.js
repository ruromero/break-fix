const shell = require('shelljs')

const TOKEN='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJicmVhay1maXgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiYmYtc2EtdG9rZW4tNHBsZGMiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiYmYtc2EiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJiNjA5OWM1Yy1mMTJhLTExZTctOWU1OC0yZWEyZTEwMDk2NzAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6YnJlYWstZml4OmJmLXNhIn0.S-9-r7Kp51bs5IQpZocPUiF5alMR7z2uvc7rJjl791stLBfybuIhekVJHtl-pk6asimbVfJSdXH0vvoXP4Uwothk3KSGkwqVVeTZMoXURUKt71S6V-Tf0pO2I5x5IB7PiuoXlnqAbQyg-smxJFfX_DlBB4KEGqPpUJxwtMyWBV0cHAAN7T8gXTBDcYkfk3BNYqBzJJ4X7EMXomFwZtbwCUmccV5ROGfJ_UdzrffGS3Vl9wzqltSp2ZI-aTny4HHZe6Hy3tjwGQDHOM1LZy4qlzrvNrL3LbWpKUa3sD8_yADTKuacK1FV7GowrIcz8Q66Uq4pygeugAhgXn7IuO-PNA'

exports.run = function(command, callback) {
  const oc_command = command + ' --token=' + TOKEN;
  console.log('running command: ' + oc_command);
  shell.exec(oc_command, {silent: true}, (code, stdout, stderr) => {
    if(code == 0) {
      callback(stdout);
    } else {
      callback(stderr);
    }
  });
};

const http = require('http');
const OC = require('./oc');

const ROUTE = 'http://' + OC.getDemoAppRoute();

exports.check = function(level, callbackFn) {
  http.get(ROUTE, (resp) => {
    let body = "";
    resp.on('data', data => {
      body += data;
    });
    resp.on("end", () => {
      body = JSON.parse(body);
      console.log(body);
      callbackFn(body.level === level);
    });
  });
}

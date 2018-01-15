const http = require('http');
const OC = require('./oc');

const ROUTE = 'http://' + OC.getDemoAppRoute();

exports.check = function(level, callbackFn) {
  http.get(ROUTE, (resp) => {
    callbackFn(resp.statusCode === 200);
  });
}

const http = require('http');

const SCOREBOARD_HOST = process.env.SCOREBOARD_HOST;
const SCOREBOARD_PORT = process.env.SCOREBOARD_PORT;

exports.ping = function(callbackFn) {
  const path = 'http://' + SCOREBOARD_HOST + ':' + SCOREBOARD_PORT + '/api';
  http.get(path, (resp) => {
    callbackFn(resp.statusCode === 200);
  });
};

exports.setScore = function(gameId, score) {
  const postData = JSON.stringify({
    gameId: gameId,
    score: score
  });
  const options = {
    hostname: SCOREBOARD_HOST,
    port: SCOREBOARD_PORT,
    path: '/api/score',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const req = http.request(options, (res) => {
    if(res.statusCode === 200) {
      console.log("Score submitted.");
    } else {
      console.log(`Unable to notify score ${res.statusCode}`);
    }
  });
  req.write(postData);
  req.end();
};

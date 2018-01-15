const http = require('http');

const SCOREBOARD_HOST = process.env.SCOREBOARD_HOST;
const SCOREBOARD_PORT = process.env.SCOREBOARD_PORT;

exports.ping = (callbackFn) => {
  const options = {
    hostname: SCOREBOARD_HOST,
    port: SCOREBOARD_PORT,
    path: '/api',
    timeout: 1000
  };
  const req = http.get(options, (resp) => {
    callbackFn(resp.statusCode === 200);
  });

  req.on('error', (error) => {
    console.log('Unable to send ping. Maybe the scoreboard is not available' + error);
  });
};

exports.setScore = (gameId, score) => {
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
    },
    timeout: 1000
  };
  const req = http.request(options, (res) => {
    if(res.statusCode === 200) {
      console.log("Score submitted.");
    } else {
      console.log(`Unable to notify score ${res.statusCode}`);
    }
    res.on('timeout', () => {
      console.log('Timeout trying to send score to the scoreboard');
    });
  });

  req.on('error', (error) => {
    console.log('Unable to send ping. Maybe the scoreboard is not available' + error);
  });
  req.write(postData);
  req.end();
};

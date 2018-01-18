const express = require('express');
const CryptoJS = require('crypto-js');
const auth = require('basic-auth');

const router = express.Router();

const Scores = require('../modules/scores');

const ADMIN_HASH = '4634137ca45a87c21e1f3fad2fb448d6aeb67f4d17ea8e3554f8f99f77642a3f';

function isAuthorized(request) {
  const credentials = auth(request);
  if(credentials.pass === undefined) {
    return false;
  }
  const hash = CryptoJS.SHA256(credentials.pass).toString();
  return ADMIN_HASH === hash;
}

router.delete('/scores/:player?/:gameId?', (req, res) => {
  if(!isAuthorized(req)) {
    res.status(401).send('');
  } else {
    if(req.params.player === undefined) {
      console.log(`Clearing all scores`);
      Scores.clearScores();
    } else {
      let player = req.params.player;
      let gameId;
      if(req.params.gameId !== undefined) {
        gameId = req.params.gameId;
      }
      console.log(`Removing score for Player: ${player} | GameID: ${gameId}`);
      Scores.removeScore(player, gameId);
    }
    res.send('');
  }
});

module.exports = router;

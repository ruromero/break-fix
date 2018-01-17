const express = require('express');
const wsapi = require('./wsapi');

let scores = [];

const players = new Map();

function removeOldScore(gameId) {
  let pos = 0;
  while(pos < scores.length) {
    if(scores[pos].gameId === gameId) {
      scores.splice(pos, 1);
      return pos;
    }
    pos++;
  }
  return -1;
}

exports.getScores = () => {
  return scores;
};

exports.addScore = (gameId, score) => {
  let pos = 0;
  const oldPos = removeOldScore(gameId);
  while(pos < scores.length && scores[pos].points >= score.points) {
    pos++;
  }
  scores.splice(pos, 0, {
    player: score.player,
    points: score.points,
    gameId: gameId
  });
  wsapi.broadcast('addScore',
  {
    position: pos,
    previous: oldPos,
    player: score.player,
    points: score.points
  });
  return pos;
};

exports.removeScore = (player, gameId) => {
  let pos = 0;
  while(pos < scores.length) {
    if(scores[pos].player === player) {
      if(gameId === undefined || gameId === scores[pos].gameId) {
        scores.splice(pos, 1);
        wsapi.broadcast('removeScore',
          {
            position: pos
          });
      } else {
        pos++;
      }
    } else {
      pos++;
    }
  }
};

exports.clearScores = () => {
  scores = [];
  wsapi.broadcast('clearScores');
}

/**
 * A new user will be broadcasted.
 * An existing user with same tokenHash will be ignored
 * An existing user with distinct tokenHash will be rejected
 */
exports.playerJoined = (player, tokenHash) => {
  if(!players.has(player)) {
    players.set(player, tokenHash);
    wsapi.broadcast('joined', {
      player: player,
      total: players.size
    });
    return true;
  }
  if(players.get(player) === tokenHash) {
    return true;
  } else {
    return false;
  }
};

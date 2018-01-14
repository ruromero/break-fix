const express = require('express');
const wsapi = require('./wsapi');
const grpc = require('grpc');

const PROTO_PATH = __dirname + '/../protos/scoreboard.proto';
const scoreboard = grpc.load(PROTO_PATH).scoreboard;

let scores = [];

const players = new Map();

exports.getScores = () => {
  return scores;
};

exports.setScore = (player, points) => {
  let pos = 0;
  while(pos < scores.length && scores[pos].points >= points) {
    pos++;
  }
  scores.splice(pos, 0, {
    player: player,
    points: points
  });
  wsapi.broadcast('addScore',
  {
    position: pos,
    player: player,
    points: points
  });

};

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

setInterval(() => {
  this.setScore('ruben', Math.floor(Math.random() * 1000));
  console.log(this.playerJoined('ruben','abcdef'));
  console.log(scores);
}, 2000);

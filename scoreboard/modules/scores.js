const express = require('express');
const wsapi = require('./wsapi');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/scores.db.json');
const db = low(adapter);

db.defaults({scores: []})
  .write();
  db.get('scores').push({
    player: 'fulano',
    points: Math.floor(Math.random() * 1000),
    gameId: '1'
  }).write();
  db.get('scores').push({
    player: 'fulano',
    points: Math.floor(Math.random() * 1000),
    gameId: '2'
  }).write();
  db.get('scores').push({
    player: 'fulano',
    points: Math.floor(Math.random() * 1000),
    gameId: '3'
  }).write();
  db.get('scores').push({
    player: 'mengano',
    points: Math.floor(Math.random() * 1000),
    gameId: '4'
  }).write();
const players = new Map();

exports.getScores = () => {
  return db.get('scores').sortBy('points').reverse().value();
};

exports.addScore = (gameId, score) => {
  const newScore = {
    player: score.player,
    points: score.points,
    gameId: gameId
  };
  if(db.get('scores').has({gameId: gameId})) {
    db.get('scores')
      .find({gameId: gameId})
      .assign({
        player: score.player,
        points: score.points
      })
      .write();
  } else {
    db.get('scores')
      .push(newScore)
      .write();
  }
  wsapi.broadcast('addScore',newScore);
};

exports.removeScore = (player, gameId) => {
  if(player !== undefined) {
    let query;
    if(gameId !== undefined) {
      query = db.get('scores').remove({gameId: gameId});
    } else {
      query = db.get('scores').remove({player: player});
    }
    for(let item of query.value()) {
      wsapi.broadcast('removeScore', {
        gameId: item.gameId
      });
    }
    query.write();
  }
};

exports.clearScores = () => {
  db.get('scores').remove().write();
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

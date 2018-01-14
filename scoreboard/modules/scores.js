const express = require('express');
const wsapi = require('./wsapi');

let scores = [];

exports.getScores = () => {
  return scores;
};

exports.addScore = (score) => {
  console.log('add score: ' + JSON.stringify(score));
  let pos = 0;
  while(pos < scores.length && scores[pos].score >= score.score) {
    pos++;
  }
  scores.splice(pos, 0, score);
  wsapi.newScore(pos, score);
};

setInterval(() => {
  this.addScore({
    player: 'ruben',
    score: Math.floor(Math.random() * 1000)
  });
  console.log(scores);
}, 2000);
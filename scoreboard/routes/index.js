const express = require('express');
const router = express.Router();
const Scores = require('../modules/scores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { scores: Scores.getScores() });
});

module.exports = router;

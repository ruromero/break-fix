const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

  let level = 1;
  if(req.query.level !== undefined) {
    level = req.query.level;
  }
  res.render('play', { title: 'Break & Fix', level: level });
});

router.post('/break', function(req, res, next) {

});

router.post('/rollback', function(req, res, next) {

});

router.post('/check', function(req, res, next) {

});

module.exports = router;

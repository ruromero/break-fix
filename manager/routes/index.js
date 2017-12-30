var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Break & Fix' });
});

router.post('/', function(req, res, next) {
  res.redirect('/play?level=1');
});

module.exports = router;

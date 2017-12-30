const express = require('express');
const Encryptor = require('../models/encryptor');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('encryptor', {title: 'Encryptor'});
});

router.post('/decrypt', function(req, res, next) {
  Encryptor.decryptFile(req.body.text, req.body.key, function(plainText) {
    console.log('Plaintext: ' + plainText);
    res.redirect('/encryptor');
  });
});

router.post('/encrypt', function(req, res, next) {
  Encryptor.encrypt(req.body.text, req.body.key, function(data) {
    console.log('Encrypted: ' + data);
    res.redirect('/encryptor');
  });
});

module.exports = router;

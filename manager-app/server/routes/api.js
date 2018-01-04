const express = require('express');
const Encryptor = require('../models/encryptor');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  Encryptor.decryptBreakLevel(1, 'demo', function(msg) {
    res.send(msg);
  })
});

module.exports = router;

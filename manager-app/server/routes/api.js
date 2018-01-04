const express = require('express');
const Encryptor = require('../models/encryptor');
const oc = require('../models/oc');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  Encryptor.decryptBreakLevel(req.query.level, req.query.key ,
    msg => {
      oc.run(msg, output => {
        res.send(output);
      });
    },
    errorMsg => {
      res.send('Unable to validate password: ' + errorMsg);
    }
);
});

router.get('/encrypt', (req, res) => {
  console.log(req.query);
  const ciphertext = Encryptor.encrypt(req.query.command, req.query.key);
  res.send(ciphertext.toString());
});

module.exports = router;

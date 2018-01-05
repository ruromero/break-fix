const express = require('express');
const Encryptor = require('../models/encryptor');
const OC = require('../models/oc');
const Validator = require('../models/validator');

const router = express.Router();

router.get('/break', (req, res) => {
  Encryptor.decryptBreakLevel(req.query.level, req.query.key,
    (commands) => {
      const success = OC.run(commands);
      if(success) {
        res.send({
          level: req.query.level,
          status: 'broken'
        });
      } else {
        res.status(500).send({
          level: req.query.level
        });
      }
    },
    (errorMsg) => {
      res.status(400).send({error: errorMsg});
    }
  );
});

router.get('/fix', (req, res) => {
  Encryptor.decryptFixLevel(req.query.level, req.query.key,
    (commands) => {
      const success = OC.run(commands);
      if(success) {
        res.send({
          level: req.query.level,
          status: 'fixed'
        });
      } else {
        res.status(500).send({
          level: req.query.level
        });
      }
    },
    (errorMsg) => {
      res.status(400).send({error: errorMsg});
    }
  );
});

router.get('/check', (req, res) => {
  Validator.check(req.query.level, (passed) => {
    if(passed) {
      res.send('PASSED');
    } else {
      res.send('FAILED');
    }
  });
});

router.get('/encrypt', (req, res) => {
  console.log(req.query);
  const commands = JSON.parse(req.query.commands).join('\n');
  const ciphertext = Encryptor.encrypt(commands, req.query.key);
  res.send(ciphertext.toString());
});

module.exports = router;

const express = require('express');
const { imagePostUpload } = require('../uploadConfig');
const router = express.Router();

router.post('/', (req, res) => {
  imagePostUpload(req, res, function(err) {
    if(err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Imagine încărcată cu succes.' });
  });
});

module.exports = router;
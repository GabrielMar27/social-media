const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  let poza_profil_base64 = req.body.image; // Șirul base64 al imaginii
  let id_user = req.body.id;
  let query = "UPDATE user SET poza_profil = ? WHERE id_user = ?;";
  con.query(query, [poza_profil_base64, id_user], (err, result) => {
    if (err) throw res.status(400).json({ result: result });
    res.status(200).json({ result: result });
  });
});

module.exports = router;

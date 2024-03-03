const express = require("express");
const router = express.Router();
const con = require("../database");
router.post("/", (req, res) => {
  let { email, parola_cont } = req.body;
  email = email.toLowerCase();
  let query =
    "SELECT id_user,nume_cont,tip_user,email,interdictie_cont,id_pers,poza_profil FROM user WHERE email=? AND parola_cont=?";
  con.query(query, [email, parola_cont], (err, result) => {
    if (err) throw err;
    res.status(200).json({ 0: result });
  });
});

module.exports = router;

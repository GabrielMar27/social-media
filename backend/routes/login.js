const express = require("express");
const router = express.Router();
const con = require("../database");
router.post("/", (req, res) => {
  let { email, parola_cont } = req.body;
  email = email.toLowerCase();
  let query = "SELECT * FROM user WHERE email=? AND parola_cont=?";
  con.query(query, [email, parola_cont], (err, result) => {
    if (err) throw err;
    res.status(200).json({ 0: result });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  const { userName } = req.body;
  let check = "%" + userName + "%";
  let query =
    "SELECT nume_cont, id_user, poza_profil FROM user WHERE nume_cont LIKE ?;";

  con.query(query, [check], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Eroare la server", error: err });
    }
    console.log(results);
    res.json(results);
  });
});

module.exports = router;

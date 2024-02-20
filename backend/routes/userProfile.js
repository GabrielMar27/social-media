const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/:idUser", (req, res) => {
  const userId = req.params.idUser;
  let query =
    "SELECT p.data_nastere,u.id_user,u.nume_cont,u.poza_profil,u.inregistrare_cont FROM user as u INNER JOIN persoana as p ON u.id_pers=p.id_pers WHERE id_user=? ";
  con.query(query, userId, (err, result) => {
    if (err) throw err;
    res.status(200).json({ result: result });
  });
});

module.exports = router;

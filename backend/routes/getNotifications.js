const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  const { receiverId } = req.body;
  con.query(
    "select p.sender_id, u.nume_cont, u.poza_profil from prieten p inner join user u on u.id_user=p.sender_id where receiver_id=? and p.stare=0",
    [receiverId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Eroare la interogarea bazei de date." });
      } else {
        res.status(200).json({ result: result });
      }
    }
  );
});
module.exports = router;

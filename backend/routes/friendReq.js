const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  // Extragem senderId, receiverId și stare din corpul cererii
  const { senderId, receiverId, stare } = req.body;

  const timeStamp = new Date().toISOString().slice(0, 10);

  // Alegem interogarea în funcție de valoarea lui 'stare'
  let query =
    stare === 0
      ? "INSERT INTO prieten(stare, timestamp, id_user, id_user_prieten) VALUES(?,?,?,?)"
      : "UPDATE prieten SET stare=?, timestamp=? WHERE id_user=? AND id_user_prieten=?";

  con.query(query, [stare, timeStamp, senderId, receiverId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "A apărut o eroare la procesarea cererii de prietenie.",
      });
    }
    if (stare === 0) {
      res
        .status(200)
        .json({ message: "Cererea de prietenie a fost trimisă cu succes." });
      con.query("DELETE FROM prieten");
    } else {
      res.status(200).json({
        message: "Cererea de prietenie a fost actualizată cu succes.",
      });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  const { senderId, receiverId } = req.body;
  con.query(
    "SELECT stare FROM prieten WHERE (sender_id = ? AND receiver_id= ?) OR (sender_id = ? AND receiver_id = ?)",
    [receiverId, senderId, senderId, receiverId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Eroare la interogarea bazei de date." });
      }
      if (result.length === 0) {
        // Nicio relație de prietenie nu a fost găsită
        return res.status(200).json({
          message: "Nicio stare de prietenie între utilizatori.",
          stare: null,
        });
      } else {
        // Returnează starea găsită
        res.status(200).json({ result: result });
      }
    }
  );
});
module.exports = router;

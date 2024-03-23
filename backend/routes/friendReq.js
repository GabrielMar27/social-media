const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  // Extragem senderId, receiverId și stare din corpul cererii
  const { senderId, receiverId, stare } = req.body;

  // Verificăm dacă există deja o cerere de prietenie de la receiverId către senderId
  con.query(
    "SELECT * FROM prieten WHERE sender_id=? AND receiver_id=?",
    [receiverId, senderId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Eroare la verificarea cererilor de prietenie existente.",
        });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: "Cererea de prietenie există deja în sens invers." });
      } else {
        const timeStamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        let query =
          stare === 0
            ? "INSERT INTO prieten(stare, timestamp, sender_id, receiver_id) VALUES(?,?,?,?)"
            : stare === 1
            ? "UPDATE prieten SET stare=?, timestamp=? WHERE sender_id=? AND receiver_id=?"
            : "UPDATE prieten SET stare=?, timestamp=? WHERE sender_id=? AND receiver_id=?";

        con.query(
          query,
          [stare, timeStamp, senderId, receiverId],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "A apărut o eroare la procesarea cererii de prietenie.",
              });
            }
            if (stare === 0) {
              res.status(200).json({
                message: "Cererea de prietenie a fost trimisă cu succes.",
              });
            } else {
              res.status(200).json({
                message: "Cererea de prietenie a fost actualizată cu succes.",
              });
            }
            console.log(receiverId);
            console.log(senderId);

            console.log(stare);
            console.log(result);
          }
        );
      }
    }
  );
});

module.exports = router;

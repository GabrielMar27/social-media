const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  const { media_postare, titlu_postare, text_postare, id_user } = req.body;
  const timeStamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  con.query(
    "INSERT INTO postari SET ?",
    [media_postare, titlu_postare, text_postare, id_user, timeStamp],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: `S-a pordus urmatoarea erroare:${err}`,
        });
      }
      res.status(200).json({
        OK: `Postare trimisa cu succes:${result}`,
      });
    }
  );
});

module.exports = router;

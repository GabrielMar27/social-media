const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", (req, res) => {
  const { media_postare, titlu_postare, text_postare, id_user } = req.body;
  const timeStamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const postData = {
    titlu_postare,
    text_postare,
    id_user,
    timeStamp: timeStamp,
  };
  con.query("INSERT INTO postari SET ?", postData, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: `S-a produs următoarea eroare: ${err}`,
      });
    } else {
      const id_postare = result.insertId;
      const poze = media_postare.map((poza) => {
        return new Promise((resolve, reject) => {
          const photoData = {
            id_postare,
            poza: poza,
          };
          con.query(
            "INSERT INTO poza_postare SET ?",
            photoData,
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });

      Promise.all(poze)
        .then((results) => {
          res.status(200).json({
            OK: `Postarea și imaginile asociate au fost trimise cu succes.`,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: `S-a produs o eroare la inserarea imaginilor: ${err}`,
          });
        });
    }
  });
});

module.exports = router;

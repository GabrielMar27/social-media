const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", async (req, res) => {
  try {
    let { nume, prenume, email, data_nastere, parola_cont, poza_profil, gen } =
      req.body;
    const isEmailUnique = await checkUniqueEmail(email);
    if (!isEmailUnique) {
      return res.status(400).send("Email-ul există deja în baza de date");
    }
    let idUtilizator = `${nume.substring(0, 2).toLowerCase()}${prenume
      .substring(0, 1)
      .toLowerCase()}`;
    let id_pers = await checkIdpers(idUtilizator);
    email = email.toLowerCase();
    let persoana = { id_pers, nume, prenume, data_nastere, gen };
    let queryInsertPers = "INSERT INTO persoana SET ?";
    await executeQuery(queryInsertPers, [persoana]);

    let nume_cont = `${nume} ${prenume}`;
    let id_user = await checkIdUsers(idUtilizator);

    let tip_user = "user";
    let inregistrare_cont = new Date().toISOString().slice(0, 10);
    let cont_inchis = false;
    let user = {
      id_user,
      nume_cont,
      tip_user,
      parola_cont,
      email,
      inregistrare_cont,
      id_pers,
      poza_profil,
      cont_inchis,
    };
    let queryInsertUser = "INSERT INTO user SET ?";
    await executeQuery(queryInsertUser, [user]);

    res.status(200).json({ 0: "Utilizator înregistrat cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 0: "Eroare internă a serverului" });
  }
});

const executeQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    con.query(query, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
const checkUniqueEmail = async (email) => {
  return new Promise((resolve, reject) => {
    let queryCheckEmail = `SELECT count(*) as Count FROM user WHERE email = ?`;
    con.query(queryCheckEmail, [email], (err, result) => {
      if (err) reject(err);

      const resultDb = result[0].Count;
      console.log(resultDb);
      resolve(resultDb === 0);
    });
  });
};
const checkIdpers = async (idUtilizator) => {
  let queryCheckId = "SELECT id_pers FROM PERSOANA WHERE id_pers LIKE ?";
  return new Promise((resolve, reject) => {
    con.query(queryCheckId, [`${idUtilizator}%`], (err, rows) => {
      if (err) reject(err);

      if (rows.length > 0) {
        let numarIncremental = rows.length;
        idUtilizator = `${idUtilizator}${numarIncremental}`;
      }

      resolve(idUtilizator);
    });
  });
};

const checkIdUsers = async (idUtilizator) => {
  let queryCheckId = "SELECT id_user FROM USER WHERE id_user LIKE ?";
  return new Promise((resolve, reject) => {
    con.query(queryCheckId, [`${idUtilizator}%`], (err, rows) => {
      if (err) reject(err);

      if (rows.length > 0) {
        let numarIncremental = rows.length;
        idUtilizator = `${idUtilizator}${numarIncremental}`;
      }

      resolve(idUtilizator);
    });
  });
};

module.exports = router;

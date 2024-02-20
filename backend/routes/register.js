const express = require("express");
const router = express.Router();
const con = require("../database");

router.post("/", async (req, res) => {
  try {
    let { nume, prenume, email, data_nastere, parola_cont, poza_profil, gen } =
      req.body;
    poza_profil =
      "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUTBxQVFRMTFRUWFxYVFRgTGhgWGBIWFhUSFhcYHSggJCElJxYfITEhJSkrLi4uHTMzODMuNzAwMC4BCgoKDg0NGhAQGi0lHR0tKy0tLS0rLS0tLSstLystLS0tLS0uKy0tKy0tLS0tLS0tKy0tLS0tLTc3LSsrNysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQIEBgMBB//EADIQAQABAwEFBQYGAwAAAAAAAAABAgMEEQUhMUFhElFxkbEiI6HB0fATFDIzcuFigfH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EAB0RAQEBAQEBAAMBAAAAAAAAAAABAhExAxIhUUH/2gAMAwEAAhEDEQA/AP0QB6WYAAAAAAAADK3bru1aW4mfAGI37Oyciv8Ac0p+M/Bt29j2Y/cmZ+CbuO8qKLeVjYWJY1qp15RvnfKJVPaq7vAl65zgAoAAAAAAAAAAAAAAAAGdizcv16Wo1n74vfAwq8qvfupjjPyhfs2bdijS1GkI1vjsnWhi7It0b8idZ7o4KNFFNunSiIiOm5kMrbVcAHHXjl49GVZ7Nf8Aqe6e9z2Vi3cWvS5HhPKXTsLtqi9RpcjWJVnXHLOuVG3tDBqxatY30zwnu6S1G0vUADoAAAAAAAAAAAAMrNubt2KaeMzoxb+xaO1mazyiZ+TlvILdm1TZtRTRwhmDztAAAAAAGF23TetzTXwlzF63Nm7NNXKdHVIO26Ozl6xziPhuX87++J00AGyQAAAAAAAAAAABT2D+7V4R6pinsGff1eEeqd+Oz1aAYLAAAAAAEbb0e8o8J9YWUXb0+9p8J9VY9c14mAN0AAAAAAAAAAAAChsOdMuf4z6wnqWxrF38ft6ezpMap147PVsBgsAAAAAAQ9uzrlR/H5yuIu2rF2b3b09nSI1Vj1zXiYA3QAAAAAAAAAAAAL+xqu1gx0mY+OvzQFjYNXsVR1ifOP6Rvx2eqoDFYAAAAAA0tsVdnBnrMR8dfk3Urb1WlqmO+Znyj+3c+uXxHAehAAAAAAAAAAAAA2dn5X5W/rxid0+fFrPjlnR1w8cO5+Li0z3xHnwl7PO0AAAAAAHObRyvzN/duinWI8+K9l3Pwsaqe6J8+Tlmnzn+p1X0BqkAAAAAAAAAAAAABY2Hf1omieW+PDmquVs3arF2KqOMfejqKKu3RE98asdzlVmsgEKAAAfKp7NOs8gTNuX+zaiiOM758I+/gjM796q/dmqvjP3owb5nIzt6AKAAAAAAAAAAAAAADi6u3HZtxHdEejl8eibl+mI5zHq6pl9FZAGagAB8rjtUzHR9AclpoPTJo/DyKo/yn1eb0MwB0AAAAAAAAAAAAAZ2rVy9VpaiZn74gtbFo7OJr3zP0UHnj2os2IpjlH/Xo89va0gA4AAAANDbVHaw9e6Yn5fNBdTkW4vWZpnnGjmb1m5Zq0uxMT98Gvzv64nTABokAAAAAAAACI1nc3MfZmRe/VHZjr9HLZBpvWxjXsifdRr15ea1j7Lx7X6/anrw8m7EREbkX6fxX4peNseinfkTr0jdHmpW7dFunS3ERHRmM7bXeADjoAAAAAAxuW6LlOlyImOrIBLydj0Vb8edOk74S7+Lex597Ex14x5uofJiJjeubscscmL+RsvHu/p9menDyTcjZeRa/T7UdPo0m5U8aQTExO8U4AA+0UVV1aURrPdCnjbIqq35E6dI4+ali4trFo0t8ec85e7K7/ipl42MWzYj3URHXn5vYGagAAAAAAAAAAAAAAAAAHjfxrN+PexE9efmmZOyKqd+POvSfqsjs1Y5xyddFVurSuNJ7pHS5WLbyqNLkeE84Gk3E/i9wGSwAAAAAAAAAAAAAAAAAAAAAAAH/9k=";
    const isEmailUnique = await checkUniqueEmail(email);
    if (!isEmailUnique) {
      return res
        .status(409)
        .json({ error: "Email-ul există deja în baza de date" });
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

    res.status(200).json({ OK: "Utilizator înregistrat cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare internă a serverului" });
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

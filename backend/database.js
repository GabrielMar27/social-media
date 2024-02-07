const mySql = require("mysql");
const express = require("express");
const con = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "social_media",
  insecureAuth: true,
});
module.exports = con;

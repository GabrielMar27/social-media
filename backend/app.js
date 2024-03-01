const express = require("express");
const cors = require("cors");
const app = express();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profilePicture = require("./routes/ProfilePictureUp");
const userProfile = require("./routes/userProfile");
const multer = require("multer");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/uploadPFP", profilePicture);
app.use(userProfile);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

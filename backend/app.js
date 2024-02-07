const express = require("express");
const cors = require("cors");
const app = express();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

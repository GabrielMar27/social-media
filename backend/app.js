const express = require("express");
const cors = require("cors");
const app = express();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profilePicture = require("./routes/ProfilePictureUp");
const userProfile = require("./routes/userProfile");
const friendReq = require("./routes/friendReq");
const checkFriendShip = require("./routes/checkFriendShip");
const getNotifications = require("./routes/getNotifications");
const searchUser = require("./routes/searchUser");
const newPost = require("./routes/createNewPost");

//test
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//rute
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/uploadPFP", profilePicture);
app.use("/friendReq", friendReq);
app.use("/checkFriendShip", checkFriendShip);
app.use("/notifications", getNotifications);
app.use("/search", searchUser);
app.use("/newPost", newPost);
app.use(userProfile);

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

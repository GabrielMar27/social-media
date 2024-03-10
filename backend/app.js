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
const multer = require("multer");

//test
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
//test
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
app.use(userProfile);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("login", (id) => {
//     socket.id = id;
//     console.log(socket.id);
//   });
//   socket.on("FrReq", (data) => {
//     console.log(data);
//     const sender = data.senderId;
//     const receiver = data.receiverId;
//     console.log("sentFrto" + receiver);

//     socket.broadcast.emit("receiveFr", sender); // Trimiteți notificarea la frontend
//   });
// });

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

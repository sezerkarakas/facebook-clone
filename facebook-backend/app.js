const express = require("express");
const app = express();
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const Image = require("./model/model");
const Message = require("./model/message");
const methodOverride = require("method-override");
const cache = require("memory-cache");
const User = require("./model/userModel");
const cloudinary = require("cloudinary").v2;
//template
app.set("view engine", "ejs");

//global variable
global.userIN = null;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB connection succesfull"))
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views/"));
const sessionMiddleware = session({
  secret: "my_keyboard_cat", // Buradaki texti değiştireceğiz.
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
});
app.use(sessionMiddleware);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

let port = process.env.PORT || "3000";

const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${port}`);
});
const io = new Server(server);

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// only allow authenticated users
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

const users = {}; // Kullanıcıları saklamak için nesne
io.on("connection", (socket) => {
  const connection = async (req, res) => {
    console.log("connection code: ", socket.request.session.userID);
    try {
      const user = await User.findById(socket.request.session.userID);
      const userName = user.name;
      users[socket.id] = userName;
      return users;
    } catch (error) {
      console.log(error);
    }
  };

  socket.on("new-user", async (name) => {
    let userArray = await connection();
    socket.broadcast.emit("user-connected", userArray);
    console.log("users", userArray);
  });

  socket.emit("chat-message", "hello world");
  socket.on("send-chat-message", (message, room) => {
    if (room == "") {
      socket.broadcast.emit("chat-message", message);
    } else {
      socket.to(room).emit("chat-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});

app.use("/", userRoutes);

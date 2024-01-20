import express from "express";
import { Server } from 'socket.io'
import "dotenv/config";
const app = express();
const PORT = process.env.VITE_PORT || 8080;
import indexRouter from "./routes/index.js";

import * as http from "http";

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

let users = [];

const getUsersSocket = (members) => {
  const usersSockets = users.filter(user => JSON.stringify(members?._id || members)?.includes(user.userId))
  return usersSockets.map(user => { return user.socketId });
}

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
}

// io.use((socket, next) => {
// const token = socket.handshake.headers.cookie.split("=")[1]
// const user = jwt.verify(token, process.env.JWT_KEY)
// if (!user.id) return next(new Error("Invalid User"))
// addUser(user.id, socket.id);
// socket.userId = user.id
//     next();
// })

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("newUser", (address) => {
    // console.log("user added")
    users.push({ address: address, socketId: socket.id })
    // console.log(users)
  });

  socket.on("sendNotification", ({ senderName, receiverAddress }) => {
    // console.log(receiverAddress)
    const receiver = getUser(receiverAddress);
    // console.log(receiver)
    const msg = `Notification sended by ${senderName}`
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      msg,
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

httpServer.listen(PORT, () => {
  console.log(`The Server is Live on http://localhost:${PORT}`);
});

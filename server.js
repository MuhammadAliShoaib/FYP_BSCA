import express from "express";
import { Server } from 'socket.io'
import "dotenv/config";
const app = express();
const PORT = process.env.VITE_PORT || 8080;
import indexRouter from "./routes/index.js";

import * as http from "http";

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

let users = []

const getUser = (address) => {
  return users.find((user) => user.address === address);
};

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("newUser", (address) => {
    console.log("user added")
    users.push({ address: address, socketId: socket.id })
    console.log(users)
  });

  socket.on("sendNotification", ({ senderName, receiverAddress }) => {
    const receiver = getUser(receiverAddress);
    console.log(receiver)
    const msg = `Notification sended by ${senderName}`
    // io.to(receiver.socketId).emit("getNotification", {
    //   senderName,
    //   msg,
    // });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

httpServer.listen(PORT, () => {
  console.log(`The Server is Live on http://localhost:${PORT}`);
});

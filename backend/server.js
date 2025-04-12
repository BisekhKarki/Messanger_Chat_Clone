const express = require("express");
const app = express();

const cors = require("cors");
const database = require("./db/Connection");
const userRouter = require("./router/UserRouter");
const userDetails = require("./router/UserDetailsRouter");
const conversation = require("./router/ConversationRouter");
const messageRouter = require("./router/MessageRouter");
const messageSchema = require("./Schema/Message");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// Server for the socket
// const socketIo = require("socket.io");
const frontendUrl = "http://localhost:3000" || process.env.FRONTENDURL;

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// App server
app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Database connection
database();

// api for frontend to register user
app.use("/api/user", userRouter);
// For all the user
app.use("/api/get", userDetails);
// For conversation
app.use("/api/conversation", conversation);
// For message
app.use("/api/message", messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Making a connection to the client
io.on("connection", (so) => {
  so.on("send_message", async (data) => {
    const newMessage = await messageSchema.create(data);

    io.emit("receive_message", newMessage);
  });

  so.on("message_read", async (messageId) => {
    const newData = await messageSchema.findByIdAndUpdate(messageId, {
      read: true,
    });

    io.emit("read_message", newData);
  });

  so.on("disconnect", () => {
    console.log("user disconnected", so.id);
  });
});

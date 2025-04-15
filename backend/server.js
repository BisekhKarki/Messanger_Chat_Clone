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
const PORT = process.env.PORT || 4000;

// Server for the socket
// const socketIo = require("socket.io");

const corsOptions = {
  origin: [String(process.env.FRONTEND_URL), "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

// App server
app.use(express.json());
app.use(cors(corsOptions));

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

server.listen(PORT, "0.0.0.0", () => {
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

  // so.on("disconnect", () => {
  //   console.log("user disconnected", so.id);
  // });
});

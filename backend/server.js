const express = require("express");
const app = express();

const cors = require("cors");
const database = require("./db/Connection");
const userRouter = require("./router/UserRouter");
const userDetails = require("./router/UserDetailsRouter");
const conversation = require("./router/ConversationRouter");
const messageRouter = require("./router/MessageRouter");
const imageRouter = require("./router/ImageRouter");
const messageSchema = require("./Schema/Message");
const dotenv = require("dotenv");
dotenv.config();
// const fs = require("fs");
const PORT = process.env.PORT || 4000;
// const path = require("path");

// Server for the socket
// const socketIo = require("socket.io");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

// For Uploaded Images
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// app.set("trust proxy", 1);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use((req, res, next) => {
//   console.log("Incoming Origin:", req.headers.origin);
//   next();
// });

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
// For sending Images
app.use("/api/images", imageRouter);
// For calling

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

const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const database = require("./db/Connection");
const userRouter = require("./router/UserRouter");
const userDetails = require("./router/UserDetailsRouter");
const conversation = require("./router/ConversationRouter");
const messageRouter = require("./router/MessageRouter");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

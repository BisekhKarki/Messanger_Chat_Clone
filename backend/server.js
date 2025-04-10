const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const database = require("./db/Connection");
const userRouter = require("./router/UserRouter");
const userDetails = require("./router/UserDetailsRouter");

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

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

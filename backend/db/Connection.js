const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const databaseConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connect) {
      console.log("Database connected at ", connect.connection.host);
    } else {
      console.log("Database not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;

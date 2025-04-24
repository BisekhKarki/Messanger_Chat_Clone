const pusher = require("pusher");
const dotenv = require("dotenv");
dotenv.config();

const pusherServer = new pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = pusherServer;

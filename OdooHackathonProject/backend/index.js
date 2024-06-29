const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: "GET,POST,PUT,DELETE,OPTIONS,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = 8000 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connect to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});

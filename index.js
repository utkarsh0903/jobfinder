const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/data");

connectDb(); 
 
const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`);
});

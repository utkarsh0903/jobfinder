const express = require("express");
const router = require("./routes/user")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/data");
const bodyParser = require("body-parser");

connectDb(); 
 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/user", router);

app.get("/", (req, res) =>{
  res.json("Hello World")
})

app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`);
});

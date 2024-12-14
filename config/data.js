const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDb = async ()=>{
    const connectionInstance = await mongoose.connect(`${MONGODB_URI}`).then(()=>{
        console.log("MongoDb connected")
    }).catch((err)=>{
        console.log(err.message) 
    });
}

module.exports = connectDb;
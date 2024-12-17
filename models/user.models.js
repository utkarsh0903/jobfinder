const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: [true, "Email must be unique"]
        },
        mobile:{
            type: String,
            required: [true, "Mobile is required"],
            unique: [true, "Mobile must be unique"]
        },
        password:{
            type: String,
            required: [true, "Password is required"]  //with error message
        }
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User;
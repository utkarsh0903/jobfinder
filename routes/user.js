const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
    const {name, email, mobile, password} = req.body;
    const userExist = await User.findOne({email:email})
    if(userExist){
        return res.status(400).json({message: "User already exist"})
    }
    const hashedPassword =await bcrypt.hash(password, 10)
    try {
        const newUser =new User({
            email,  
            mobile,
            name,
            password: hashedPassword
        })
    
        await newUser.save();
        return res.status(200).json({message: "User registered succesfully"});
    } catch (error) {
        return res.status(500).json({message: "Error in creating user"})
    }
})

router.post("/login",async (req, res)=>{
    const {email, password} = req.body;
    const userExist = await User.findOne({email: email})
    if(!userExist){
        return res.status(400).json({message: "Wrong Email or password"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, userExist.password)
    if(!isPasswordCorrect){
        return res.status(500).json({message: "Wrong username or password"})
    }
    const payload = {
        id: userExist._id
    }
    const token =await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "4h"});
    res.cookie("token",token);
    return res.status(200).json({message: "Login succesfull", token: token})
})

module.exports = router;
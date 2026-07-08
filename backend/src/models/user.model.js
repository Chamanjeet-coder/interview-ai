// const mongoose = require("mongoose")
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, "account already exist with this email"],
        required: true
    },
    password: {
        type: String,
        // unique: true,
        required: true
    }
})

const userModel = mongoose.model("User", userSchema)

export default userModel
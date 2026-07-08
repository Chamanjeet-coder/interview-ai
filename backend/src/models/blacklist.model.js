// const mongoose = require("mongoose")
import mongoose from "mongoose"

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
    }
}, {
    timestamps: true
})

const tokenBlackListModel = mongoose.model("blacklistToken", blacklistTokenSchema)

export default tokenBlackListModel
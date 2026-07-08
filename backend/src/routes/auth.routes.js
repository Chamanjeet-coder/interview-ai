import express from "express"
import {
    registerUserController,
    loginUserController
} from "../controllers/auth.controller.js"

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access Public
 */
authRouter.post("/register", registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", loginUserController)

/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user
 * @access Private
 */
authRouter.get("/get-me", (req, res) => {
    res.send("Get Me Route Working")
})

export default authRouter
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isUserAlreadyExists = await userModel.findOne(
            { $or: [{ username }, { email }] }
        )

        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body
// console.log("email",email,"password",password)
// console.log(req.headers)
// console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token)

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

import express from "express"
import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv/config'

const router = express.Router()

router.post("/signup", async (req, res) => {
    const { email, password, role } = req.body
    
    if (!(email && password && role)) {
        res.status(401).json({ message: "All filed are required" })
        return;
    }

    if (!(role !== "admin" && role !== "user")) {
        res.status(400).json({ message: "role can only be admin/user" })
        return;
    }

    if (!email.split("").includes("@")) {
        res.status(400).json({ message: "email is not accepted" })
        return;
    }

    if (password.length <= 8 | password.length >= 20) {
        res.status(400).json({ message: "password must be between 8 and 20 characters" })
        return;
    }

    const user = await User.findOne({ email })

    if (user) {
        res.status(409).json({ message: "This email already exist" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
    })

    if(newUser){
        res.status(201).json({
            email : newUser.email,
            password : newUser.password,
            role : newUser.role,
            token : generateToken(newUser.id)
        })
    }
    else{
        res.status(400).json({message : "Wrong user data"})
    }
})


router.post("/signin", async (req, res) => {
    const { email, password, role } = req.body
    const user = await User.findOne({ email })
    if (user && role === user.role && await bcrypt.compare(password, user.password)) {
        res.status(201).json({ token : generateToken(user.id), message: "signin successfully" })
    } else {
        res.status(401).json({ message: "wrong user credentials" })
    }
})


const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "5h"})
}

export default router

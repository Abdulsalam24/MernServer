
import express from "express"
import mongoose from "mongoose"
import router from "./routes/index.js"
import dotenv from 'dotenv/config'

const app = express()
const PORT = 3001

mongoose.connect(process.env.MONGODB_URL)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Hey")
}) 

app.use("/api", router)


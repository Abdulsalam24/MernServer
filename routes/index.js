import express from "express"
import authRouter from "../controller/authRouter.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.send('api endpoint')
})

router.use('/auth', authRouter)


export default router

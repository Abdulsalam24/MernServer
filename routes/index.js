import express from "express"
import authRouter from "../controller/authRouter.js"
import rentRouter from "../controller/rentRouter.js"


const router = express.Router()

router.get('/', (req, res) => {
    res.send('api endpoint')
})


router.use('/auth', authRouter)
router.use('/rent', rentRouter)



export default router

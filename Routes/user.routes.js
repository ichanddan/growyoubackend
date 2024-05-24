import express from 'express'
import { Profile, login, signup } from '../Controller/user.controller.js'
import { log } from '../Middleware/index.middleware.js'
import { authToken } from '../Middleware/jwt.auth.js'
const router = express.Router()

router.get("/", (req,res)=>{
    res.send("Hii DOsto")
})


router.post("/signup", signup)
router.post("/login",log, login)
router.get("/profile", authToken , Profile)




export default router
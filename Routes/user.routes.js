import express from 'express'
import { Roll, login, signup } from '../Controller/user.controller.js'
import { log } from '../Middleware/index.middleware.js'
const router = express.Router()

router.get("/", (req,res)=>{
    res.send("Hii DOsto")
})


router.post("/signup", signup)
router.get("/login",log, login)

router.get("/login/:id", Roll)



export default router
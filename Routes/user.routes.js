import express from 'express'
import { Profile, contect, contecusData, getBlog, getBlogId, login, postBlog, signup, userType, userUpdate } from '../Controller/user.controller.js'
import { log } from '../Middleware/index.middleware.js'
import { authToken } from '../Middleware/jwt.auth.js'
const router = express.Router()

router.get("/", (req,res)=>{
    res.send("Hii DOsto")
})


router.post("/signup", signup)
router.post("/login",log, login)
router.get("/usertype/:id", userType)
router.get("/profile", authToken , Profile)
router.post("/contect", contect)
router.post("/profile/update", authToken, userUpdate)
router.post("/blog", authToken , postBlog)
router.get("/blog" , getBlog)
router.get("/blog/:id" , getBlogId)
router.get("/contectus" , contecusData)




export default router
import { User } from "../Models/user.models.js";

const log = async (req,res,next)=>{
    console.log(`log is ${new Date().toISOString()}`)
    next()
}

export {log}
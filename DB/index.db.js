import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const ConnectDB = async ()=>{
    try {
        const DB = await mongoose.connect(process.env.MANGO_DB)
        console.log(`DB is connected ${DB}`)
    } catch (error) {
        console.log("Db is not connected ", error)
    }
}
export default ConnectDB
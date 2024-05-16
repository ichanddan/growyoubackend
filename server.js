import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './DB/index.db.js';
import  user  from './Routes/user.routes.js';

dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

app.use("/api/v1" , user)

ConnectDB()


app.listen(port, () =>{
    console.log(`App is runing http://localhost:${port}`)
})
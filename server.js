import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './DB/index.db.js';
const app = express();
const port = process.env.PORT || 4000;


ConnectDB()


app.listen(port, () =>{
    console.log(`App is runing http://localhost:${port}`)
})
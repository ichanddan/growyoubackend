import express from 'express'
import dotenv from 'dotenv'
const app = express();
const port = process.env.PORT || 4000;





app.listen(port, () =>{
    console.log(`App is runing http://localhost:${port}`)
})
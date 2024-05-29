import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import route from './routes/userRoute.js'
import { userModel } from './models/userSchema.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000 
const URL = process.env.MONGOURL
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(URL).then(()=>{
console.log("db is connected");

app.listen(port , () =>{
    console.log(`your server is runing on ${port}`);
})
}).catch(error => console.log(error))


app.use("/api" , route)

app.get('/' , async (req , res) =>{
    try {
        const allData = await userModel.find({})
        res.json(allData)
    } catch (error) {
        console.log(error);
    }
})
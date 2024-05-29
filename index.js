import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
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

app.get('/' , async (req , res) =>{
    try {
        const allData = await userModel.find({})
        res.json(allData)
    } catch (error) {
        console.log(error);
    }
})
 app.post('/create' , async(req, res) => {
    try {
        const userData = new userModel(req.body)
        if (!userData) {
            return res.status(404).json({ msg: "data is not found" })
        }
        const savedData = await userData.save()
        res.status(200).json(savedData)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


app.get('/getall', async (req, res) => {
    try {
        const userData = await userModel.find({})
        res.send(userData)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/getone/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id)
        res.send(userExist)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        res.send(userExist)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id)
        await userModel.findByIdAndDelete(id)

        res.send("user deleted")
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

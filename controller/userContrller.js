import { userModel } from "../models/userSchema.js";

export const create = async(req , res) =>{
    try {
        const userData = new userModel(req.body)
        if (!userData) {
            return res.status(404).json({msg: "data is not found"})
        }
        const savedData = await userData.save()
        res.status(200).json(savedData)
    } catch (error) {
        res.status(500).json({error: error})
    }
}


export const getAll = async(req , res) =>{
    try {
        const userData = await userModel.find({})
        res.send(userData)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const getOne = async(req , res) =>{
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id)
        res.send(userExist)
    } catch (error) {
        res.status(500).json({error: error})
    }

}

export const update = async(req , res) =>{
    try {
        const id = req.params.id;
        const userExist = await userModel.findByIdAndUpdate(id , req.body , {new: true})
        res.send(userExist)
    } catch (error) {
        res.status(500).json({error: error})
    }

}
export const deleteUser = async(req , res) =>{
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id)
        await userModel.findByIdAndDelete(id)

        res.send("user deleted")
    } catch (error) {
        res.status(500).json({error: error})
    }
}

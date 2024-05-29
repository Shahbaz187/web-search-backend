import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
})

export const userModel = mongoose.model("user" , userSchema)
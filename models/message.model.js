import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message : {type:String , require :true},
    senderId : {type:mongoose.Schema.Types.ObjectId , ref:'User' },
    ReciverId : {type:mongoose.Schema.Types.ObjectId , ref:'User'}
})

export default messageSchema = mongoose.model('Message' , messageSchema)
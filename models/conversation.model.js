import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participantId : [{type:mongoose.Schema.Types.ObjectId , ref:'User' }],
    messages : [{type:mongoose.Schema.Types.ObjectId , ref:'Message'}]
})

export default conversationSchema = mongoose.model('Conversation' , conversationSchema)
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    caption : {type:String , default : ''},
    Image : {type:String , require:true},
    author : {type:mongoose.Schema.Types.ObjectId , ref:'User' ,require:true},
    comment : [{type:mongoose.Schema.Types.ObjectId , ref:'Comments'}],
    likes :[{type:mongoose.Schema.Types.ObjectId , ref:'User'}]
})

export default PostSchema = mongoose.model('Post' , PostSchema)
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female'] },
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

// Export the model
export default mongoose.model('User', userSchema);

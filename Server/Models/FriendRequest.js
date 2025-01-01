import mongoose from "mongoose";

const Friend = new mongoose.Schema({
    sender:{
      type: mongoose.Schema.ObjectId,
      user:"User"
    },
    recipient:{
        type: mongoose.Schema.ObjectId,
        user:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export default FriendRequest = 
new mongoose.model("FriendRequest", Friend);
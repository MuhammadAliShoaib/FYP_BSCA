import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: String,
    message: String,
},
);

module.exports = mongoose.model("Message", MessageSchema);
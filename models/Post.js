const mongoose = require("mongoose")
const UserSchema = require("./User")

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true
    },
    rescreams: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", PostSchema)
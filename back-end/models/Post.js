const mongoose = require('mongoose')
const { Schema, model } = mongoose
const User = require("./User")

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date() 
    },
    body: {
        type: String,
        required: true
    },
    subforum: {
        type: String,
        required: true
    },
    upvoteCnt: {
        type: Number,
        required: true,
        default: 0
    },
    downvoteCnt: {
        type: Number,
        required: true,
        default: 0
    },
    commentCnt: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = model('Post', postSchema)
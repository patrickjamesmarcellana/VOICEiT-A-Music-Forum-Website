const mongoose = require('mongoose')
const { Schema, model } = mongoose

const postSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true
    },
    photoUrl: {
        type: String,
        default: "empty-profile.png"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    subforum: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date() 
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
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",
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
    subcomments: {
        type: [Schema.Types.ObjectId], // technically an ObjectID but we do not need to populate it
        ref: "Comment"
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
})

module.exports = model('Comment', commentSchema)
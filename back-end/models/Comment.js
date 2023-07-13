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
    upvoters: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
        default: []
    },
    downvoters: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
        default: []
    },
    subcomments: {
        type: [Schema.Types.ObjectId], // technically an ObjectID but we do not need to populate it
        ref: "Comment"
    }
})

module.exports = model('Comment', commentSchema)
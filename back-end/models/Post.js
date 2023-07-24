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
        default: Date.now 
    },
    updateDate: {
        type: Date,
        default: Date.now
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
    },
    views: { // popularity is based on the number of views on the post
        type: Number,
        default: 0,
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    top_level_comments_list: {
        type: [String], // technically an ObjectID but we do not need to populate it
        required: true,
        default: []
    }
})

postSchema.index({title: 'text', body: 'text'}) // text index that will be useful for the search feature

// store in sorted orders
postSchema.index({date: 1, _id: 1}) // sort by new (with tie-breaker)
postSchema.index({views: 1, _id: 1})  // sort by top (with tie-breaker)
module.exports = model('Post', postSchema)
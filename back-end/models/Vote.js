// Notes
// 1. I decided to store the votes in its own collection because we might want to query the list of upvotes/downvotes the User performed

const Constants = require("../constants")
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    type: {
        type: Number,
        enum: [Constants.VOTE_TYPE_POST, Constants.VOTE_TYPE_COMMENT],
        required: true,
    },
    target: { // reference to the post/comment
        type: Schema.Types.ObjectId,
        required: true,
    },
    vote: { // the vote type
        type: Number,
        enum: [Constants.STATE_UPVOTED, Constants.STATE_DOWNVOTED],
    },
})

// optimize vote count calculation
voteSchema.index({type: 1, target: 1, vote: 1})

// optimize post/comment query
voteSchema.index({user: 1, type: 1, target: 1})

module.exports = model('Vote', voteSchema)
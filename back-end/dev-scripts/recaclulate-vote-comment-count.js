const Constants = require("../constants")
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const Vote = require("../models/Vote")
require('dotenv').config()

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log(`Mongoose connected to DB`)

    const comments = await Comment.find({}).exec()
    for(let i = 0; i < comments.length; i++) {
        const target_id = comments[i]._id
        await Comment.findByIdAndUpdate(target_id, {
            upvoteCnt:   await Vote.count({type: Constants.VOTE_TYPE_COMMENT, target: target_id, vote: Constants.STATE_UPVOTED}),
            downvoteCnt: await Vote.count({type: Constants.VOTE_TYPE_COMMENT, target: target_id, vote: Constants.STATE_DOWNVOTED})
        })
    }

    const posts = await Post.find({}).exec()
    for(let i = 0; i < posts.length; i++) {
        const target_id = posts[i]._id
        await Post.findByIdAndUpdate(target_id, {
            commentCnt:  await Comment.count({post_id: target_id}),
            upvoteCnt:   await Vote.count({type: Constants.VOTE_TYPE_POST, target: target_id, vote: Constants.STATE_UPVOTED}),
            downvoteCnt: await Vote.count({type: Constants.VOTE_TYPE_POST, target: target_id, vote: Constants.STATE_DOWNVOTED})
        })
    }

    process.exit(0)
})

 

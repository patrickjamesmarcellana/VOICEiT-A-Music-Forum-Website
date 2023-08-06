const router = require("express").Router()

const Constants = require("../constants")
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const Vote = require("../models/Vote")

const asyncHandler = require('express-async-handler')

router.post("/:target_type/:target_id/:vote_state", asyncHandler(async (req, res) => {
    try {
        const target_type = req.params.target_type // "post" or "comment"
        const target_id = req.params.target_id // id of post/comment
        const vote_state = parseInt(req.params.vote_state) // 0-3 corresponding to the Constants.STATE_* enum

        let target_type_id = -1
        if(target_type == "post") {
            target_type_id = Constants.VOTE_TYPE_POST
        } else if(target_type == "comment") {
            target_type_id = Constants.VOTE_TYPE_COMMENT
        }
        
        /*
            Check
                1. Login
                2. target type is valid
                3. vote state is valid
        */
        if(req.user && target_type_id != -1 && 0 <= vote_state && vote_state <= 3) {
            const user_id = req.user._id
            const vote_query = {user: user_id, type: target_type_id, target: target_id}
            const count = await Vote.count(vote_query)

            switch(vote_state) {
                case Constants.STATE_NOT_VOTED:
                    if(count > 0) {
                        await Vote.deleteOne(vote_query) // delete vote
                    }
                    break;
                case Constants.STATE_UPVOTED:
                case Constants.STATE_DOWNVOTED:
                    if(count > 0) {
                        await Vote.updateOne(vote_query, {vote: vote_state}) // modify vote
                    } else {
                        await Vote.create({user: user_id, type: target_type_id, target: target_id, vote: vote_state}) // create vote
                    }
                    break;
                case Constants.STATE_INVALID:
                    console.log("Received invalid state from client")
                    break
            }

            // recompute
            switch(target_type_id) {
                case Constants.VOTE_TYPE_COMMENT:
                    await Comment.findByIdAndUpdate(target_id, {
                        upvoteCnt:   await Vote.count({type: Constants.VOTE_TYPE_COMMENT, target: target_id, vote: Constants.STATE_UPVOTED}),
                        downvoteCnt: await Vote.count({type: Constants.VOTE_TYPE_COMMENT, target: target_id, vote: Constants.STATE_DOWNVOTED})
                    })
                    break;
                case Constants.VOTE_TYPE_POST:
                    await Post.findByIdAndUpdate(target_id, {
                        upvoteCnt:   await Vote.count({type: Constants.VOTE_TYPE_POST, target: target_id, vote: Constants.STATE_UPVOTED}),
                        downvoteCnt: await Vote.count({type: Constants.VOTE_TYPE_POST, target: target_id, vote: Constants.STATE_DOWNVOTED})
                    })
                    break;
            }

            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
        
    } catch(e) {
        console.log(e)
    }
}))

module.exports = router

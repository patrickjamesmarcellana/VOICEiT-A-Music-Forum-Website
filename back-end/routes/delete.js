const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

router.delete("/post/:post_id", async (req, res) => {
    const post = await Post.findById(req.params["post_id"]).populate("user").exec()
    if(req.user && req.user._id.equals(post.user._id)) {
        await Post.findByIdAndDelete(req.params["post_id"])
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

router.delete("/comment/:comment_id", async (req, res) => {
    const comment = await Comment.findById(req.params["comment_id"]).populate("user").exec()
    if(req.user && req.user._id.equals(comment.user._id)) {
        await Comment.findByIdAndUpdate(req.params["comment_id"], {
            user: null,
            date: null,
            body: "[deleted]"
        }).exec()
    
        await Post.findByIdAndUpdate(comment.post_id, {
            commentCnt: await Comment.count({post_id: comment.post_id, body: {$ne: "[deleted]"} })
        }).exec()

        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;

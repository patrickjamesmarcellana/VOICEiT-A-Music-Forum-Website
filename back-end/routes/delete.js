const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

router.delete("/post/:post-id", async (req, res) => {
    const post = await Post.findById(req.params["post-id"]).populate("user").exec()
    if(req.user && req.user._id.equals(post.user._id)) {
        await Post.findByIdAndDelete(req.params["post-id"])
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

router.delete("/comment/:comment-id", async (req, res) => {
    const comment = await Comment.findById(req.params["comment-id"]).populate("user").exec()
    if(req.user && req.user._id.equals(comment.user._id)) {
        await Comment.findByIdAndDelete(req.params["comment-id"])
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;

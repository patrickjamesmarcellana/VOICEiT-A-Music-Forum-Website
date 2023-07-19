const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

router.post("/create-post", async (req, res) => {
    if(req.user && req.body) {
        console.log(req.body)
        const postTitle = req.body["post-title"]
        const postBody = req.body["post-content"]
        const postSubforum = req.body["subforum"]

        if(postTitle && postBody /* && postSubforum is valid*/) {
            const new_post = await Post.create({
                user: req.user._id,
                title: postTitle,
                body: postBody,
                subforum: postSubforum,
            })

            res.redirect(`/post.html?post=${new_post.id}`)
        } else {
            res.sendStatus(400)
        }

    } else {
        res.sendStatus(401)
    }
})

module.exports = router

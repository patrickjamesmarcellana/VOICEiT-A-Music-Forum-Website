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
        const deleteDescendants = async (comment_id) => {
            const node = await Comment.findById(comment_id)
            await Comment.findByIdAndDelete(comment_id)

            for(const child of node.subcomments) {
                await deleteDescendants(child)
            }
        }
        await deleteDescendants(req.params["comment_id"])

        await Post.updateMany({}, {
            $pull: {
                top_level_comments_list: { 
                    $in: [req.params["comment_id"]]
                }
            }
        }).exec()
        await Comment.updateMany({}, {
            $pull: {
                subcomments: { 
                    $in: [req.params["comment_id"]]
                }
            }
        }).exec()




        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;

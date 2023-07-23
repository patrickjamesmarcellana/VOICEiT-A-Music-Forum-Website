const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

const multer = require("multer")
const upload = multer({dest: "../../front-end/uploads/"}) 

router.post("/create-post", async (req, res) => {
    if(req.user) {
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

router.patch("/edit-post", async (req, res) => {
    const postId = req.body["post-id"]
    const post = await Post.findById(postId).populate("user").exec()

    if(req.user && req.user._id.equals(post.user._id)) {
        const postTitle = req.body["post-title"]
        const postBody = req.body["post-content"]

        if(postTitle && postBody) {
            post.title = postTitle
            post.body = postBody
            post.isEdited = true
            
            await post.save()

            res.redirect(`/post.html?post=${post.id}`)
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
})

router.post("/create-comment", async (req, res) => {
    if(req.user) {
        const commentContent = req.body["comment-content"]
        const parentPost = req.body["parent-post"]
        const parentComment = req.body["parent-comment"] ?? null // can be null, also convert undefined to null using "??"

        if(commentContent && parentPost) {
            const new_comment = await Comment.create({
                user: req.user._id,
                post_id: parentPost,
                parent_comment_id: parentComment,
                body: commentContent,
            })

            if(parentComment != null) {
                await Comment.findByIdAndUpdate(parentComment, {
                    $push: {subcomments: new_comment._id}
                }).exec()
            } else {
                await Post.findByIdAndUpdate(parentPost, {
                    $push: {top_level_comments_list: new_comment._id}
                }).exec()
            }
            res.send({
                comment_id: new_comment.id
            })
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
})

router.patch("/edit-comment/:comment_id", async (req, res) => {
    const commentId = req.params.comment_id
    const comment = await Comment.findById(commentId).populate("user").exec()

    if(req.user && req.user._id.equals(comment.user._id)) {
        const commentContent = req.body["comment-content"]

        if(commentContent) {
            comment.body = commentContent
            comment.isEdited = true
            
            await comment.save()

            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
})

router.post('/edit-profile', upload.single('file'), async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
    }
    console.log("BOUND")
    console.log(req.body)
    console.log(req.file)
    // const new_picture = URL.createObjectURL(req.body["file"]);
    // const user_id = req.user._id;
    // await User.findByIdAndUpdate(user_id, {
    //     description: req.body["description"],
    //     photoUrl: new_picture
    // });

    // res.redirect(`/profile.html?user=${req.user.username}`);
});

module.exports = router

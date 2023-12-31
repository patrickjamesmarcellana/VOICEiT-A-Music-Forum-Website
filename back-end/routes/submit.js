const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

const multer = require("multer")
const asyncHandler = require('express-async-handler')

const forums_list = [
    "home",
    "popular",
    "alternative",
    "classical",
    "country",
    "jazz",
    "kpop",
    "latin",
    "pop",
    "rnb",
    "rap",
    "rock"
]

router.post("/create-post", asyncHandler(async (req, res) => {
    if(req.user) {
        const postTitle = req.body["post-title"]
        const postBody = req.body["post-content"]
        const postSubforum = req.body["subforum"]

        if(postTitle && postBody && forums_list.includes(postSubforum)) {
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
}))

router.patch("/edit-post", asyncHandler(async (req, res) => {
    const postId = req.body["post-id"]
    const post = await Post.findById(postId).populate("user").exec()

    if(req.user && req.user._id.equals(post.user._id)) {
        const postTitle = req.body["post-title"]
        const postBody = req.body["post-content"]
        const postSubforum = req.body["subforum"]

        if(postTitle && postBody && forums_list.includes(postSubforum)) {
            post.title = postTitle
            post.body = postBody
            post.subforum = postSubforum
            post.isEdited = true
            post.updateDate = Date.now()
            
            await post.save()

            res.redirect(`/post.html?post=${post.id}`)
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
}))

router.post("/create-comment", asyncHandler(async (req, res) => {
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
            // update comment count
            await Post.findByIdAndUpdate(parentPost, {
                commentCnt:  await Comment.count({post_id: parentPost}),
            })

            res.send({
                comment_id: new_comment.id
            })
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
}))

router.patch("/edit-comment/:comment_id", asyncHandler(async (req, res) => {
    const commentId = req.params.comment_id
    const comment = await Comment.findById(commentId).populate("user").exec()

    if(req.user && req.user._id.equals(comment.user._id)) {
        const commentContent = req.body["comment-content"]

        if(commentContent) {
            comment.body = commentContent
            comment.isEdited = true
            comment.date = Date.now()
            
            await comment.save()

            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    }
}))

// const upload = multer({dest: "./front-end/uploads/"}) 
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./front-end/uploads/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${req.user.username}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage
})


// Routers below are for Edit Profile
router.patch('/edit-profile', upload.single('file'), asyncHandler(async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
    }
    
    console.log("Photo upload complete")
    console.log(req.body)
    console.log(req.file)

    const photo_file_path = `uploads/${req.file.filename}`
    await User.findByIdAndUpdate(req.user._id, {
        description: req.body["description"],
        photoUrl: photo_file_path
    })

    res.send(200)
}));

router.patch('/set-default-photo', asyncHandler(async (req, res) => { // removing a photo is updating it to default
    try {
        await User.findByIdAndUpdate(req.user._id, {
            photoUrl: `images/empty-profile.png`
        });
        res.send(200);
    } catch(err) {
        console.error(err)
        res.send(502)
    }
}));

router.patch('/edit-description', asyncHandler(async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
    }

    await User.findByIdAndUpdate(req.user._id, {
        description: req.body["description"],
    })

    res.send(200)
}));

module.exports = router

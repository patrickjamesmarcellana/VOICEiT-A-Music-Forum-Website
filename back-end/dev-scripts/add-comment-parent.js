const Comment = require("../models/Comment")
require('dotenv').config()

const mongoose = require("mongoose")

const setCommentParent = async () => {
    const comments = await Comment.find({}).exec()
    for(let i = 0;  i < comments.length; i++) {
        const parent_comment = await Comment.findOne({
            subcomments: {$in: comments[i]._id}
        })

        if(parent_comment != null) {
            await comments[i].updateOne({
                parent_comment_id: parent_comment._id
            })
        }
    }
}

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log(`Mongoose connected to DB`)
    await setCommentParent()
    process.exit(0)
})



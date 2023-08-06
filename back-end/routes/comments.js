const router = require("express").Router()

const Constants = require("../constants")
const Comment = require("../models/Comment")
const Utils = require("../utils/utils")

const {parse_pagination_params, cursor_paginate} = require("../utils/pagination")
const asyncHandler = require('express-async-handler')

const documentToJson = (document) => {
    console.log(document)
    
    const flags = []
    let username, date
    if(document.user) {
        if(document.isEdited) {
            flags.push("edited")
        }
        
        username = document.user.username
        date = document.date
    }
        
    
    return {
        post_id: document.post_id,
        parent_comment_id: document.parent_comment_id,
        comment_id: document.id,
        date: date,
        subcomments: document.subcomments,

        flags: flags,
        author: username,
        votes: document.upvoteCnt - document.downvoteCnt,
        vote_state: Constants.STATE_NOT_VOTED,
        content: document.body
    }
}

const documentsToJson = (documents) => {
    const json = []
    
    for(let i = 0; i < documents.length; i++) {
        json.push(documentToJson(documents[i]))
    }
    return json
}


router.get('/id/:id', asyncHandler(async (req, res) => {
    console.log("Request for comment by id", req.params.id)
    try {
        const query = await Comment.findById(req.params.id).populate("user")
        const json = documentToJson(query)

        if(req.user)
            await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_COMMENT, [json])
    
        if(json != null) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }
}))

router.use((req, res, next) => {
    if(!req.user) 
        req.disablePagination = true

    next()
})
router.use(parse_pagination_params)
router.get("/user/:user", asyncHandler(async (req, res) => {
    console.log("Request for comments by user", req.params.user)
    try {
        const user_id = await User.findOne({username: req.params.user})
        const query = await cursor_paginate(Comment, {user: user_id}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.query.post_limit) // sort by new
        const json = documentsToJson(query);

        if(req.user)
            await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_COMMENT, json)

        if(json !== undefined) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }
}))

// count comments by user
router.get("/count/user/:user", asyncHandler(async (req, res) => {
    let user_id = await User.findOne({username: req.params.user})
    res.send(`${await Comment.count({user: user_id})}`)
}))

module.exports = router
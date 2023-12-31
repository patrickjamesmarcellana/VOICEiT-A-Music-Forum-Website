const router = require("express").Router()

const Comment = require("../models/Comment")
const Constants = require("../constants")
const Post = require("../models/Post")
const User = require("../models/User")
const Utils = require("../utils/utils")

const {parse_pagination_params, cursor_paginate} = require("../utils/pagination")

const asyncHandler = require('express-async-handler')

// remove private info, set public info etc
// and get comments list
// TODO: explore https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#pipe._S_lookup
const documentToJson = async (document) => { 
    //console.log(document)
    return {
        post_id: document._id,
        subforum: document.subforum,
        op: document.user.username,
        photoUrl: document.user.photoUrl,
        score: document.score,
        isEdited: document.isEdited,
                
        title: document.title,
        text: document.body,
        date: document.date,
        updateDate: document.updateDate,
        upvote_count: document.upvoteCnt,
        downvote_count: document.downvoteCnt,
        comment_count: await Comment.count({post_id: document._id, body: { $ne: "[deleted]"}}),
        views: document.views,
        top_level_comments_list: document.top_level_comments_list
    }
}

const documentsToJson = async (documents) => {
    const json = []
    
    for(let i = 0; i < documents.length; i++) {
        json.push(await documentToJson(documents[i]))
    }
    return json
}

router.get("/id/:id", asyncHandler(async (req, res) => {
    console.log("Request for post by id", req.params.id)
    let query = await Post.findById(req.params.id).populate("user").exec()
    await Post.updateOne({_id: req.params.id}, {$inc: {views: 1}})
    console.log(query)
    if (query === null) {
        res.sendStatus(404);
        return;
    }

    const json = [await documentToJson(query)]
    
    if (req.user) {
        await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
    }

    if(json != null) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
}))

// prevent unregistered users from attmpting to load more pages
router.use((req, res, next) => {
    if(!req.user) 
        req.disablePagination = true

    next()
})

// pagination proper
router.use(parse_pagination_params)

router.get("/user/:user", asyncHandler(async (req, res) => {
    console.log("Request for posts by user", req.params.user)
    console.log(req.query)
    try {
        
        let user_id = await User.findOne({username: req.params.user})
        let query = await cursor_paginate(Post, {user: user_id}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.query.post_limit)
        
        let json = await documentsToJson(query)
        
        if(req.user)
            await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)

        if(json != null) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        console.error(err)
    }
}))

router.get("/subforum/:subforum", asyncHandler(async (req, res) => {
    console.log("Request for posts by subforum", req.params.subforum)

    let query
    if(req.params.subforum == "home")
        query = await cursor_paginate(Post, {}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.query.post_limit)
    else if(req.params.subforum == "popular")
        query = await cursor_paginate(Post, {}, "views", req.query.last_sent_views, req.query.last_sent_id, req.query.post_limit)
    else
        query = await cursor_paginate(Post, {subforum: req.params.subforum}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.query.post_limit)
  
    const json = await documentsToJson(query)
    if(req.user)
        await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
}))

router.get("/search/:searchkey", asyncHandler(async(req, res) => {
    console.log("Request for posts via search key: ", req.params.searchkey)
    const key = req.params.searchkey
    try {
        let json
        if(req.query.post_limit > 0) {
            const query = await Post.aggregate([
                { $match: { $text: { $search: key } } } ,
                { $addFields: { score: { $meta: "textScore" } } },
                { $sort: { score: -1, _id: -1 } },
                { $match: { $or: [ 
                    {
                        score: {$eq: req.query.last_sent_score},
                        _id:   {$lt: req.query.last_sent_id}
                    },
                    {
                        score: {$lt: req.query.last_sent_score}
                    }
                ] } },
                { $limit: req.query.post_limit }
            ])

            await User.populate(query, {path: "user"})
            console.log(query)
            json = await documentsToJson(query)
            if(req.user)
                await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
        } else {
            json = []
        }
        
        if(json !== undefined) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        console.error(err)
    }
}))

// count posts in subforum
router.get("/count/subforum/:subforum", asyncHandler(async (req, res) => {
    if(req.params.subforum === "home" || req.params.subforum === "popular")
        res.send(`${await Post.count({})}`)
    else
        res.send(`${await Post.count({subforum: req.params.subforum})}`)
}))

// count posts by user
router.get("/count/user/:user", asyncHandler(async (req, res) => {
    let user_id = await User.findOne({username: req.params.user})
    res.send(`${await Post.count({user: user_id})}`)
}))

module.exports = router

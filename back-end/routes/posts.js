const router = require("express").Router()

const Comment = require("../models/Comment")
const Constants = require("../constants")
const Post = require("../models/Post")
const User = require("../models/User")
const Utils = require("../utils/utils")

const {parse_pagination_params, cursor_paginate} = require("../utils/pagination")

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
                
        title: document.title,
        text: document.body,
        date: document.date,
        upvote_count: document.upvoteCnt,
        downvote_count: document.downvoteCnt,
        comment_count: await Comment.count({post_id: document._id}),
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

router.get("/id/:id", async (req, res) => {
    console.log("Request for post by id", req.params.id)
    try{
        let query = await Post.findById(req.params.id).populate("user").exec()
        await Post.updateOne({_id: req.params.id}, {$inc: {views: 1}})
        console.log(query)
        const json = [await documentToJson(query)]

        if(req.user)
            await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)

        if(json != null) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }
})

// pagination
router.use(parse_pagination_params)

router.get("/user/:user", async (req, res) => {
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
})

router.get("/subforum/:subforum", async (req, res) => {
    console.log("Request for posts by subforum", req.params.subforum)

    let query
    if(req.params.subforum == "home")
        query = await cursor_paginate(Post, {}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.params.post_limit)
    else if(req.params.subforum == "popular")
        query = await cursor_paginate(Post, {}, "views", req.query.last_sent_views, req.query.last_sent_id, req.params.post_limit)
    else
        query = await cursor_paginate(Post, {subforum: req.params.subforum}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.params.post_limit)
  
    const json = await documentsToJson(query)
    if(req.user)
        await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

router.get("/search/:searchkey", async(req, res) => {
    console.log("Request for posts via search key: ", req.params.searchkey)
    const key = req.params.searchkey
    try {
        // parse last_sent_score
        if(req.query.last_sent_score) {
            req.query.last_sent_score = parseFloat(req.query.last_sent_score)
        } else {
            req.query.last_sent_score = Infinity // if nothing was last sent
        }

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
        const json = await documentsToJson(query)
        if(req.user)
            await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
        
        if(json !== undefined) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        console.error(err)
    }
})

module.exports = router

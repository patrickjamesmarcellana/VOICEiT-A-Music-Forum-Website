const router = require("express").Router()

const Comment = require("../models/Comment")
const Constants = require("../constants")
const Post = require("../models/Post")
const User = require("../models/User")
const Utils = require("../utils/utils")

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
router.use((req, res, next) => {
    // if the front-end knows the last post it was sent
    // we can skip all posts that were posted earlier than that

    if(req.query.last_sent_views) {
        req.query.last_sent_views = parseInt(req.query.last_sent_views)
    } else {
        req.query.last_sent_views = 2 ** 64 // reasonable max num of views
    }

    if(req.query.last_sent_datetime) {
        req.query.last_sent_datetime = new Date(req.query.last_sent_datetime)
    } else {
        req.query.last_sent_datetime = new Date(8640000000000000) // max date supported by JS
    }

    if(req.query.last_sent_id) {
        req.query.last_sent_id = req.query.last_sent_id
    } else {
        // NOTE: since it is a hex string, it must be compared with the hex string .id (instead of ._id)
        req.query.last_sent_id = "ffffffffffffffffffffffff" // max object id
    }

    if(req.query.post_limit) {
        req.query.post_limit = parseInt(req.query.post_limit)
    } else {
        req.query.post_limit = 10 // 10 post limit
    }

    next()
})

router.get("/user/:user", async (req, res) => {
    console.log("Request for posts by user", req.params.user)
    console.log(req.query)
    try {
        
        let user_id = await User.findOne({username: req.params.user})
        let query = await request_paginate(Post, {user: user_id}, "date", req.query.last_sent_datetime, req.query.last_sent_id, post_limit)
        
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
        query = await request_paginate(Post, {}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.params.post_limit)
    else if(req.params.subforum == "popular")
        query = await request_paginate(Post, {}, "views", req.query.last_sent_views, req.query.last_sent_id, req.params.post_limit)
    else
        query = await request_paginate(Post, {subforum: req.params.subforum}, "date", req.query.last_sent_datetime, req.query.last_sent_id, req.params.post_limit)
  
    const json = await documentsToJson(query)
    if(req.user)
        await Utils.addUserVoteStateToJson(req.user._id, Constants.VOTE_TYPE_POST, json)
    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})


const request_paginate = async (collection, filter_query, metric_name, last_sent_score, last_sent_id, post_limit) => {
    try {
        // req.cursor = await Post.find().populate("user").sort({date: -1}).cursor()
        // for (let doc = await req.cursor.next(), i = 0; doc != null && i < 5; doc = await req.cursor.next()) {
        //     query.push(doc)
        //     i++
        // }
        
        // for now: retrieve all then handle per-batch load in front end

        // UPDATE: attempt to do it without cursors
        // inspiration: https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
        // sort by date field
        // tie-breaker in the case the posts have the same date/time: post id

        // note: we could use object ID only to sort the posts (since first 4 bytes of it represents the time in seconds) but
        //   1. the sample post's document creation time (eg. the time when the document was inserted to the DB) !=  post's actual creation date (eg. the hardcoded time of the post)
        //   2. the object ID will overflow in the year 2106

        sort_query = {}
        sort_query[metric_name] = -1 // sort by scores first in descending order,
        sort_query["id"] = -1 // if they have equal scores, sort by the object ID in descending order

        // Case 1: all posts with score < last sent score
        const case1 = {}
        case1[metric_name] = {$lt: last_sent_score}

        // Case 2: all posts with score = last sent score, but ID < last sent ID
        const case2 = {}
        case2[metric_name] = {$eq: last_sent_score}
        case2["id"] = {$lt: last_sent_id }

        const query = await collection.find({
            $and: [
                {
                    $or: [ case1, case2 ],
                }, 
                filter_query,
            ]
        }).sort(sort_query).limit(post_limit).populate("user").exec() // DEBUG: to dump the actual query process, add .explain() before .exec()

        // DEBUG: in the dump, make sure the word SORT does not appear 
        // for performance reasons, we should not be sorting every time we query
        //console.log(query.queryPlanner)

        return query
    } catch(e) {
        console.log(e)
    }
}

router.get("/search/:searchkey", async(req, res) => {
    console.log("Request for posts via search key: ", req.params.searchkey)
    const key = req.params.searchkey
    try {
        const query = await Post.aggregate([
            { $match: { $text: { $search: key } } } ,
            { $addFields: { score: { $meta: "textScore" } } },
            { $sort: { score: -1 } },
            { $match: { $or: [ 
                {
                    score: {$eq: req.query.last_sent_score},
                    id:    {$lt: req.query.last_sent_id}
                },
                {
                    score: {$lt: req.query.last_sent_score}
                }
            ] } },
            { $limit: post_limit }
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

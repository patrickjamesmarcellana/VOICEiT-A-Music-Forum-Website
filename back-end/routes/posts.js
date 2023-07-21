const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

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
    
        if(json != null) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }
})

router.get("/user/:user", async (req, res) => {
    console.log("Request for posts by user", req.params.user)
    try {
        let user_id = await User.findOne({username: req.params.user})
        let query = await Post.find({user: user_id}).populate("user")
        let json = await documentsToJson(query)
        
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

    try {
        let query = []
        // let cursor

        //TODO: fix this before Sat Sep 13 275760 08:00:00 GMT+0800 (Philippine Standard Time)
        let last_sent_views = 2 ^ 64 // reasonable max num of views
        let last_sent_datetime = new Date(8640000000000000) // max date supported by JS
        let last_sent_id = 2 ^ 96 // larger than max id (2^96 - 1)
        let post_limit = 0 // no limit

        // if the front-end knows the last post it was sent
        // we can skip all posts that were posted earlier than that
        if(req.query.last_sent_views) {
            last_sent_views = req.query.last_sent_views
        }
        if(req.query.last_sent_datetime) {
            last_sent_datetime = new Date(req.query.last_sent_datetime)
        }
        if(req.query.last_sent_id) {
            last_sent_id = new Date(req.query.last_sent_id)
        }
        if(req.query.post_limit) {
            post_limit = req.query.post_limit
        }
        
        //hardcoded_posts_list.forEach(post => post.comment_count = comment_count(post.top_level_comments_list))
        console.log(req.query)
        if(req.params.subforum === "home") {
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

            query = await Post.find({
                $or: [
                    {
                        date: { $lt: last_sent_datetime },
                    },
                    {
                        date: last_sent_datetime,
                        id: {$lt: last_sent_id }
                    }
                ]
            }).sort({date: -1, _id: -1}).limit(post_limit).populate("user").exec() // DEBUG: to dump the actual query process, add .explain() before .exec()

            // DEBUG: in the dump, make sure the word SORT does not appear 
            // for performance reasons, we should not be sorting every time we query
            //console.log(query.queryPlanner)
        } else if(req.params.subforum === "popular"){
            query = await Post.find({
                $or: [
                    {
                        views: { $lt: last_sent_views },
                    },
                    {
                        views: last_sent_views,
                        id: {$lt: last_sent_id }
                    }
                ]
            }).sort({views: -1, _id: -1}).limit(post_limit).populate("user").exec()
        } else {
            query = await Post.find({
                $and: [
                    {
                        $or: [
                        {
                            date: { $lt: last_sent_datetime },
                        },
                        {
                            date: last_sent_datetime,
                            id: {$lt: last_sent_id }
                        }
                        ],
                    }, 
                    {
                        subforum: req.params.subforum,
                    },
                ]
            }).sort({date: -1, _id: -1}).limit(post_limit).populate("user").exec()
        }
        
        const json = await documentsToJson(query)
        if(json !== undefined) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }
})

router.get("/search/:searchkey", async(req, res) => {
    console.log("Request for posts via search key: ", req.params.searchkey)
    const key = req.params.searchkey
    try {
        const query = await Post.aggregate([
            { $match: { $text: { $search: key } } },
            { $sort: { score: { $meta: "textScore" } } }
        ])

        await User.populate(query, {path: "user"})

        console.log(query)
        const json = await documentsToJson(query)
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

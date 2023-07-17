const router = require("express").Router()

const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

// remove private info, set public info etc
// and get comments list
// TODO: explore https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#pipe._S_lookup
const documentToJson = async (document) => { 
    console.log(document)
    return {
        post_id: document._id,
        subforum: document.subforum,
        op: document.user.username,
                
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
        let cursor
        
        //hardcoded_posts_list.forEach(post => post.comment_count = comment_count(post.top_level_comments_list))
        if(req.params.subforum === "home") {
            // req.cursor = await Post.find().populate("user").sort({date: -1}).cursor()
            // for (let doc = await req.cursor.next(), i = 0; doc != null && i < 5; doc = await req.cursor.next()) {
            //     query.push(doc)
            //     i++
            // }
            
            // for now: retrieve all then handle per-batch load in front end
            query = await Post.find().sort({date: -1}).populate("user").exec()
        } else if(req.params.subforum === "popular"){
            query = await Post.find().sort({views: -1}).populate("user").exec()
        } else {
            query = await Post.find({subforum: req.params.subforum}).populate("user").exec()
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
    // Post.createIndexes({title: 'text', body: 'text'}) // text index that will be useful for the search feature
    try {
        // How to Populate Users with aggregate?

        const query = await Post.aggregate([
            { $match: { $text: { $search: key } } },
            { $sort: { score: { $meta: "textScore" } } }
        ])

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

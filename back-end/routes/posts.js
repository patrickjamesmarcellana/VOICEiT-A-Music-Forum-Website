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
        comment_count: await Comment.count({post_id: document._id}),
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
        let query = await Post.findById(req.params.id).populate("user")
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
    } catch {

    }
})

router.get("/subforum/:subforum", async (req, res) => {
    console.log("Request for posts by subforum", req.params.subforum)
    function compare_date(d1, d2) {
        return new Date(d2.date) - new Date(d1.date);
    }
    
    function compare_comment_count(c1, c2) {
        return c2.comment_count - c1.comment_count;
    }

    try {
        let query = await Post.find().populate("user")
        let json = await documentsToJson(query)
        
        //hardcoded_posts_list.forEach(post => post.comment_count = comment_count(post.top_level_comments_list))
        if(req.params.subforum === "home") {
            //json = hardcoded_posts_list.sort(compare_date)
        } else if(req.params.subforum === "popular"){
            //json = hardcoded_posts_list.sort(compare_comment_count)
        } else {
            //json = hardcoded_posts_list.filter(post => post.subforum === req.params.subforum)
        }
        
    
        if(json !== undefined) {
            res.send(json)
        } else {
            res.sendStatus(404)
        }
    } catch(e) {
        console.log(e)
    }

})

module.exports = router

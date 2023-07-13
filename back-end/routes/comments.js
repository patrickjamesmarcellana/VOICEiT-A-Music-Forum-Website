const router = require("express").Router()

const Comment = require("../models/Comment")

const STATE_NOT_VOTED = 0
const STATE_UPVOTED = 1
const STATE_DOWNVOTED = 2
const STATE_INVALID = 3

const documentToJson = (document) => {
    console.log(document)
    return {
        post_id: document.post_id,
        comment_id: document.id,
        subcomments: document.subcomments,

        flags: [],
        author: document.user.username,
        votes: document.upvoters.length + document.downvoters.length,
        vote_state: STATE_NOT_VOTED,
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

router.get('/id/:id', async (req, res) => {
    console.log("Request for comment by id", req.params.id)
    try {
        const query = await Comment.findById(req.params.id).populate("user")
        const json = documentToJson(query)
    
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
    console.log("Request for comments by user", req.params.user)
    try {
        const user_id = await User.findOne({username: req.params.user})
        const query = await Comment.find({user: user_id}).populate("user")
        const json = documentsToJson(query);

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
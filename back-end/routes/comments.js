const router = require("express").Router()

const Constants = require("../constants")
const Comment = require("../models/Comment")
const Vote = require("../models/Vote")

const documentToJson = (document) => {
    console.log(document)
    return {
        post_id: document.post_id,
        comment_id: document.id,
        subcomments: document.subcomments,

        flags: [],
        author: document.user.username,
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

// add vote state to a set of comments (an array of comments)
const addVoteToJson = async (user_id, json) => {
    for(let i = 0; i < json.length; i++) {
        const vote_info = await Vote.findOne({user: user_id, type: Constants.VOTE_TYPE_COMMENT, target: json[i].comment_id})
        if(vote_info != null) {
            json[i].vote_state = vote_info.vote
        }
    }
}
router.get('/id/:id', async (req, res) => {
    console.log("Request for comment by id", req.params.id)
    try {
        const query = await Comment.findById(req.params.id).populate("user")
        const json = documentToJson(query)

        if(req.user)
            await addVoteToJson(req.user._id, [json])
    
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

        if(req.user)
            await addVoteToJson(req.user._id, json)

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
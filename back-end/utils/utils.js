const Constants = require("../constants")
const Vote = require("../models/Vote")

// add vote state to a set of comments (an array of posts/comments)
const addUserVoteStateToJson = async (user_id, type, json) => {
    for(let i = 0; i < json.length; i++) {
        let target

        // TODO: maybe a unified type attribute
        if(type == Constants.VOTE_TYPE_COMMENT) 
            target = json[i].comment_id
        else if(type == Constants.VOTE_TYPE_POST)
            target = json[i].post_id
        
        const vote_info = await Vote.findOne({user: user_id, type: type, target: target})
        if(vote_info != null) {
            json[i].vote_state = vote_info.vote
        }
    }
} 

module.exports = Object.freeze({addUserVoteStateToJson})
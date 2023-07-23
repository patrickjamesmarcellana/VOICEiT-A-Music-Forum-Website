const router = require("express").Router()
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const {parse_pagination_params, cursor_paginate} = require("../utils/pagination")

router.get("/:user", async (req, res) => {
    console.log("Request for user", req.params.user)
    const user_results = await User.find({username: req.params.user})
    if(user_results.length > 0) {
        const json = {
            username: user_results[0].username,
            description: user_results[0].description,
            photoUrl: user_results[0].photoUrl,
            lastLogin: user_results[0].lastLogin,
            registerDate: user_results[0].registerDate
        }
        res.send(json)
    } else {
        res.sendStatus(404)
    }
}) 

router.get("/:user/combo", parse_pagination_params, async (req, res) => {
    let user = await User.findOne({username: req.params.user})

    console.log(req.query.last_sent_datetime, req.query.last_sent_id)
    const combo = await Post.aggregate([
        { $match: {user: user._id} },
        { $project: { type: "post", _id: 1, date: 1 } },
        { $unionWith: { 
            coll: "comments", 
            pipeline: [
                { $match: {user: user._id} }, 
                { $project: { type: "comment", _id: 1, date: 1 } } 
            ] } },
        { $sort: { date: -1, _id: -1, type: -1 } },
        { $match: { $or: [ 
            {
                date: {$eq: req.query.last_sent_datetime},
                _id:  {$eq: req.query.last_sent_id},
                type: {$ne: req.query.last_sent_type}
            },
            {
                date: {$eq: req.query.last_sent_datetime},
                _id:  {$lt: req.query.last_sent_id}
            },
            {
                date: {$lt: req.query.last_sent_datetime}
            }
        ] } },
        { $limit: req.query.post_limit }
    ]).exec()

    res.send(combo)
})
module.exports = router

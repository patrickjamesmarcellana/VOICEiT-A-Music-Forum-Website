const router = require("express").Router()
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const {parse_pagination_params, cursor_paginate} = require("../utils/pagination")
const asyncHandler = require('express-async-handler')

router.get("/:user", asyncHandler(async (req, res) => {
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
}))

router.use((req, res, next) => {
    if(!req.user) 
        req.disablePagination = true

    next()
})

router.get("/:user/combo", parse_pagination_params, asyncHandler(async (req, res) => {
    let user = await User.findOne({username: req.params.user})

    // MongoDB assumes that "0" means no limit, which is not ideal in our case
    if(req.query.post_limit == 0) {
        res.send([])
    } else {
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
    }
}))
module.exports = router

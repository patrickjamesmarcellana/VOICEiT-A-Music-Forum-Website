const {ObjectId} = require('mongodb');

const MAX_VIEWS = 2 ** 64
const MAX_DATE = new Date(8640000000000000) // max date supported by JS
const MAX_OBJECTID = new ObjectId("ffffffffffffffffffffffff") // max object id

const parse_pagination_params = (req, res, next) => {
    // if the front-end knows the last post it was sent
    // we can skip all posts that were posted earlier than that

    if(req.query.last_sent_views) {
        req.query.last_sent_views = parseInt(req.query.last_sent_views)
    } else {
        req.query.last_sent_views = MAX_VIEWS // assume last post had infinite views
    }

    if(req.query.last_sent_datetime) {
        req.query.last_sent_datetime = new Date(req.query.last_sent_datetime)
        console.log(req.query.last_sent_datetime)
    } else {
        req.query.last_sent_datetime = MAX_DATE // assume last post was posted in the far future (get posts before it)
    }

    if(req.query.last_sent_score) {
        req.query.last_sent_score = parseFloat(req.query.last_sent_score)
    } else {
        req.query.last_sent_score = Infinity // assume last post's text similarity score was infinitely high
    }

    if(req.query.last_sent_id) {
        req.query.last_sent_id = new ObjectId(req.query.last_sent_id)
    } else {
        // NOTE: since it is a hex string, it must be compared with the hex string .id (instead of ._id)
        req.query.last_sent_id = MAX_OBJECTID
    }

    if(req.query.post_limit) {
        req.query.post_limit = parseInt(req.query.post_limit)
    } else {
        req.query.post_limit = 10 // 10 post limit
    }

    // disable pagination if configured
    if(req.disablePagination && (
        req.query.last_sent_views != MAX_VIEWS ||
        req.query.last_sent_datetime != MAX_DATE ||
        req.query.last_sent_score != Infinity ||
        req.query.last_sent_id != MAX_OBJECTID
    )) {
        req.query.post_limit = 0
    }
    next()
}

const cursor_paginate = async (collection, filter_query, metric_name, last_sent_score, last_sent_id, post_limit) => {
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
        
        // MongoDB assumes that "0" means no limit, which is not ideal in our case
        if(post_limit == 0) {
            return []
        }

        sort_query = {}
        sort_query[metric_name] = -1 // sort by scores first in descending order,
        sort_query["_id"] = -1 // if they have equal scores, sort by the object ID in descending order

        // Case 1: all posts with score < last sent score
        const case1 = {}
        case1[metric_name] = {$lt: last_sent_score}

        // Case 2: all posts with score = last sent score, but ID < last sent ID
        const case2 = {}
        case2[metric_name] = {$eq: last_sent_score}
        case2["_id"] = {$lt: last_sent_id }

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

module.exports = Object.freeze({parse_pagination_params, cursor_paginate})

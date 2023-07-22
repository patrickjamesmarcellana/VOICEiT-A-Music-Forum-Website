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

module.exports = Object.freeze({cursor_paginate})

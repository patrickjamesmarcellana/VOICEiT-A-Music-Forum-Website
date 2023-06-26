hardcoded_comments[6] = () => {
    const OP = USER4
    
    // 1
    comment = {
        post_id: 6,
        comment_id: 601,
        subcomments: [602],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "That's just like, your opinion, man. A very shitty one, too."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 6,
        comment_id: 602,
        subcomments: [603],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "no, I agree with him"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 6,
        comment_id: 603,
        subcomments: [],

        flags: [],
        author: USER3,
        votes: -2,
        vote_state: STATE_NOT_VOTED,
        content: "Have this downvote."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 6,
        comment_id: 604,
        subcomments: [],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I remember him performing during Royal Rumble 2022. What an absolute waste of time and money. It's just like Maroon 5 and Travis Scott during the Super Bowl LIII halftime show. Unbelievable."
    }
    dumpComment(comment)
}
 

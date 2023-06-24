hardcoded_comments[6] = () => {
    const OP = USER4
    top_level_comments_list = [1, 4]
    
    // 1
    comment = {
        comment_id: 1,
        subcomments: [2],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "That's just like, your opinion, man. A very shitty one, too."
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 2,
        subcomments: [3],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "no, I agree with him"
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 3,
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
        comment_id: 4,
        subcomments: [],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I remember him performing during Royal Rumble 2022. What an absolute waste of time and money. It’s just like Maroon 5 and Travis Scott during the Super Bowl LIII halftime show. Unbelievable."
    }
    dumpComment(comment)

    loadAllComment()
}
 

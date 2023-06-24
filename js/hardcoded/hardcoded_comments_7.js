hardcoded_comments[7] = () => {
    const OP = USER1,
    top_level_comments_list = [1, 3]
    
    // 1
    comment = {
        comment_id: 1,
        subcomments: [2],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Charles Mingus - Mingus Ah Um"
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 2,
        subcomments: [],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "good taste, was just about to comment the same thing"
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 3,
        subcomments: [4],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Idle Moments by Grant Green, no doubt about it."
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
        content: "Yes, fantastic album. Absolute classic."
    }
    dumpComment(comment)

    loadAllComment()
}
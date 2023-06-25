hardcoded_comments[2] = () => {
    const OP = USER2
    top_level_comments_list = [201, 203]

    // 1
    comment = {
        comment_id: 201,
        subcomments: [202],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Relapse, hands down. Better production, flows, and lyrics. Recovery has its hooks and choruses literally catered to 14-year-old girls. Em hasn’t topped Relapse yet. Screw Recovery.        "
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 202,
        subcomments: [],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "L take"
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 203,
        subcomments: [204],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Recovery gang"
    }
    dumpComment(comment)

    // 4
    comment = {
        comment_id: 204,
        subcomments: [],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "frfr"
    }
    dumpComment(comment)

    loadAllComment()
}

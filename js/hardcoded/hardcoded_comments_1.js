hardcoded_comments[1] = () => {
    const OP = USER5
    top_level_comments_list = [101, 103, 105]

    // 1
    comment = {
        comment_id: 101,
        subcomments: [102],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You sure it’s not Bastille - Pompeii?"
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 102,
        subcomments: [],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "lmao I seriously can’t tell if you’re being sarcastic or not, but I just woke up my kids from laughing so hard"
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 103,
        subcomments: [104],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "This has to be Zedd - Clarity. Check the part around 1:09"
    }
    dumpComment(comment)

    // 4
    comment = {
        comment_id: 104,
        subcomments: [],

        flags: [],
        author: OP,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Sorry, it’s not it"
    }
    dumpComment(comment)

    // 5
    comment = {
        comment_id: 105,
        subcomments: [106],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Roses by the Chainsmokers maybe?"
    }
    dumpComment(comment)

    // 6
    comment = {
        comment_id: 106,
        subcomments: [],

        flags: [],
        author: OP,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I don’t think it’s too EDM-y like that one"
    }
    dumpComment(comment)

    loadAllComment()
}

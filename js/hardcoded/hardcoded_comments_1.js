

const hardcoded_comments_1 = () => {
    const OP = "insertOPusernamehere"
    top_level_comments_list = [1, 3, 5]
    
    // 1
    comment = {
        comment_id: 1,
        subcomments: [2],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You sure it’s not Bastille - Pompeii?"
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 2,
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
        comment_id: 3,
        subcomments: [4],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "This has to be Zedd - Clarity. Check the part around 1:09"
    }
    dumpComment(comment)

    // 4
    comment = {
        comment_id: 4,
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
        comment_id: 5,
        subcomments: [6],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Roses by the Chainsmokers maybe?"
    }
    dumpComment(comment)

    // 6
    comment = {
        comment_id: 6,
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

hardcoded_comments[1] = hardcoded_comments_1

hardcoded_comments[3] = () => {
    const OP = USER2

    // 1
    comment = {
        post_id: 3,
        comment_id: 301,
        subcomments: [302],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Wait, Imagine Dragons is a rock band?"
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 3,
        comment_id: 302,
        subcomments: [303],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "They’re usually considered pop-rock, but they’re just stylish pop imo"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 3,
        comment_id: 303,
        subcomments: [],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Nah, pop-rock is Blink 182, early One Republic, Fall Out Boy, and Coldplay, not that garbage"
    }
    dumpComment(comment)
}
 

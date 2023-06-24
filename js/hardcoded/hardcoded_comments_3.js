hardcoded_comments[3] = () => {
    const OP = USER2,
    top_level_comments_list = [1]

    // 1
    comment = {
        comment_id: 1,
        subcomments: [2],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Wait, Imagine Dragons is a rock band?"
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
        content: "They’re usually considered pop-rock, but they’re just stylish pop imo"
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 3,
        subcomments: [],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Nah, pop-rock is Blink 182, early One Republic, Fall Out Boy, and Coldplay, not that garbage"
    }
    dumpComment(comment)

    loadAllComment()
}
 

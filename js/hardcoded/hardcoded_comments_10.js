hardcoded_comments[10] = () => {
    const OP = "insertOPusernamehere"
    top_level_comments_list = [1, 2]
    
    // 1
    comment = {
        comment_id: 1,
        subcomments: [],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You have to understand that most people aren’t really passionate about music and will just follow whatever the ongoing trend or fad is. They’re only interested in whatever’s popular. But you shouldn’t care about that. Screw them. Just do you, and your people and the community you belong to will find you."
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
        content: "Got to be honest, aren’t most mainstream rock bands labeled as “alternative” or “indie” despite them not actually being alternative or independent? Say, like, Radiohead."
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
        content: "When every band, even the popular ones got marketed as “indie”, that word just completely lost its meaning."
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
        content: "yeah, it’s such a broad term that it lost its original meaning"
    }
    dumpComment(comment)

    loadAllComment()
}
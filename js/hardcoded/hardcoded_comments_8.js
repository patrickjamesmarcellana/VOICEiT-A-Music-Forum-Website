hardcoded_comments[8] = () => {
    const OP = "insertOPusernamehere"
    top_level_comments_list = [1, 2, 3]

    // 1
    comment = {
        comment_id: 1,
        subcomments: [],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Most definitely start with Bach and Mozart so you can get a good feel of the genre and know what to expect from that point. People might say try Tchaikovsky but I feel like his music is just flashy and is unsuited for a beginner. Maybe when you’ve grown accustomed to the entire thing."
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
        content: `Bach: Goldberg Variations \n
        Mozart: Symphonies 25, 40, and 41\n
        Beethoven: Symphonies 3, 5, 7, and 9\n
        Chopin: …everything.\n
        Tchaikovsky: Symphony No. 4\n
        Debussy: Clair De Lune\n
        `
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
        content: "The only answer you need is Bach. And more Bach."
    }
    dumpComment(comment)

    loadAllComment()
}
 

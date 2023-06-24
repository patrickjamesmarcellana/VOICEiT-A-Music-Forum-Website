hardcoded_comments[4] = () => {
    const OP = USER1
    top_level_comments_list = [1, 2, 3]

    // 1
    comment = {
        comment_id: 1,
        subcomments: [],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I honestly loved it. It’s the perfect post-breakup album, so it really spoke to me. I love her so much."
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
        content: "Loved it. Even the ones I skipped on re-listens, I like them."
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
        content: "I like it, but it’s definitely too long. CTRL > SOS. 7-8/10"
    }
    dumpComment(comment)

    loadAllComment()
}
 

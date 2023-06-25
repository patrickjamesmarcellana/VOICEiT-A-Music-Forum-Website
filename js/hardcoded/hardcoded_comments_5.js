hardcoded_comments[5] = () => {
    const OP = USER3
    top_level_comments_list = [501, 503]
    
    // 1
    comment = {
        comment_id: 501,
        subcomments: [502],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "So happy for them. Hope they can keep this up and their other songs get popular as well."
    }
    dumpComment(comment)

    // 2
    comment = {
        comment_id: 502,
        subcomments: [],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Yes. As much as I love Cupid, I just think Higher is their best song yet. I honestly have trouble getting it out of my head."
    }
    dumpComment(comment)

    // 3
    comment = {
        comment_id: 503,
        subcomments: [504],

        flags: [],
        author: USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Hope they could make something out of this and not just become another artist or group that became viral on TikTok. I wish them all the best."
    }
    dumpComment(comment)

    // 4
    comment = {
        comment_id: 504,
        subcomments: [],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "They already signed with Warner Records, so I think they’ll do fine"
    }
    dumpComment(comment)

    loadAllComment()
}
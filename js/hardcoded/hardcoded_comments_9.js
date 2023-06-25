hardcoded_comments[9] = () => {
    const OP = USER4
    
    // 1
    comment = {
        post_id: 9,
        comment_id: 901,
        subcomments: [902],

        flags: [],
        author: USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I don’t know about you but I hear this one guitar tone in literally every country song known to mankind. If there’s anything that would put someone off, it’s definitely one of the reasons."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 9,
        comment_id: 902,
        subcomments: [],

        flags: [],
        author: USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I highly agree on this. It’s just the same song copy and pasted without any innovation. It’s become like hip-hop imo"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 9,
        comment_id: 903,
        subcomments: [],

        flags: [],
        author: USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "The rednecks, the cowboy boots, rednecks, line dancing, rednecks, lyrics no man on Earth would be able to relate to, rednecks, and the extremely simple and repetitive song structure. Oh, did I forget to mention the rednecks?" + "\n" + 
        "Country music is the same old, soulless song filled with boring, bland, and dull cliches produced over and over again by corporations with clearly no regard for quality. There are exceptions, of course, but then again, they are exceptions, not the rule."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 9,
        comment_id: 904,
        subcomments: [],

        flags: [],
        author: USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You’ll never find a good country song on the radio. You actually have to actively seek them out. Listen to Colter Wall and Orville Peck on Spotify and you’ll see the difference."
    }
    dumpComment(comment)
}
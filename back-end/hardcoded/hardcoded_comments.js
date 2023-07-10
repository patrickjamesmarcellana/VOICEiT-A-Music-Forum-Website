const hardcoded_users = require("./hardcoded_users")
const hardcoded_comments_loader = {}
let hardcoded_comments = {}

const dumpComment = function(comment) {
    hardcoded_comments[comment.comment_id] = comment;
}

const STATE_NOT_VOTED = 0
const STATE_UPVOTED = 1
const STATE_DOWNVOTED = 2
const STATE_INVALID = 3

hardcoded_comments_loader[1] = () => {
    const OP = hardcoded_users.USER5

    // 1
    comment = {
        post_id: 1,
        comment_id: 101,
        subcomments: [102],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You sure it's not Bastille - Pompeii?"
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 1,
        comment_id: 102,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "lmao I seriously can't tell if you're being sarcastic or not, but I just woke up my kids from laughing so hard"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 1,
        comment_id: 103,
        subcomments: [104],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "This has to be Zedd - Clarity. Check the part around 1:09"
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 1,
        comment_id: 104,
        subcomments: [],

        flags: [],
        author: OP,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Sorry, it's not it"
    }
    dumpComment(comment)

    // 5
    comment = {
        post_id: 1,
        comment_id: 105,
        subcomments: [106],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Roses by the Chainsmokers maybe?"
    }
    dumpComment(comment)

    // 6
    comment = {
        post_id: 1,
        comment_id: 106,
        subcomments: [],

        flags: [],
        author: OP,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I don't think it's too EDM-y like that one"
    }
    dumpComment(comment)
}

hardcoded_comments_loader[2] = () => {
    const OP = hardcoded_users.USER2

    // 1
    comment = {
        post_id: 2,
        comment_id: 201,
        subcomments: [202],

        flags: [],
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Relapse, hands down. Better production, flows, and lyrics. Recovery has its hooks and choruses literally catered to 14-year-old girls. Em hasn't topped Relapse yet. Screw Recovery.        "
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 2,
        comment_id: 202,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "L take"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 2,
        comment_id: 203,
        subcomments: [204],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Recovery gang"
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 2,
        comment_id: 204,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "frfr"
    }
    dumpComment(comment)
}
hardcoded_comments_loader[3] = () => {
    const OP = hardcoded_users.USER2

    // 1
    comment = {
        post_id: 3,
        comment_id: 301,
        subcomments: [302],

        flags: [],
        author: hardcoded_users.USER3,
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
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "They're usually considered pop-rock, but they're just stylish pop imo"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 3,
        comment_id: 303,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Nah, pop-rock is Blink 182, early One Republic, Fall Out Boy, and Coldplay, not that garbage"
    }
    dumpComment(comment)
}
 
hardcoded_comments_loader[4] = () => {
    const OP = hardcoded_users.USER1

    // 1
    comment = {
        post_id: 4,
        comment_id: 401,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I honestly loved it. It's the perfect post-breakup album, so it really spoke to me. I love her so much."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 4,
        comment_id: 402,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Loved it. Even the ones I skipped on re-listens, I like them."
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 4,
        comment_id: 403,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I like it, but it's definitely too long. CTRL > SOS. 7-8/10"
    }
    dumpComment(comment)
}
 
hardcoded_comments_loader[5] = () => {
    const OP = hardcoded_users.USER3
    
    // 1
    comment = {
        post_id: 5,
        comment_id: 501,
        subcomments: [502],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "So happy for them. Hope they can keep this up and their other songs get popular as well."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 5,
        comment_id: 502,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Yes. As much as I love Cupid, I just think Higher is their best song yet. I honestly have trouble getting it out of my head."
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 5,
        comment_id: 503,
        subcomments: [504],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Hope they could make something out of this and not just become another artist or group that became viral on TikTok. I wish them all the best."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 5,
        comment_id: 504,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "They already signed with Warner Records, so I think they'll do fine"
    }
    dumpComment(comment)
}

hardcoded_comments_loader[6] = () => {
    const OP = hardcoded_users.USER4
    
    // 1
    comment = {
        post_id: 6,
        comment_id: 601,
        subcomments: [602],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "That's just like, your opinion, man. A very shitty one, too."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 6,
        comment_id: 602,
        subcomments: [603],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "no, I agree with him"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 6,
        comment_id: 603,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER3,
        votes: -2,
        vote_state: STATE_NOT_VOTED,
        content: "Have this downvote."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 6,
        comment_id: 604,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I remember him performing during Royal Rumble 2022. What an absolute waste of time and money. It's just like Maroon 5 and Travis Scott during the Super Bowl LIII halftime show. Unbelievable."
    }
    dumpComment(comment)
}
 
hardcoded_comments_loader[7] = () => {
    const OP = hardcoded_users.USER1
    
    // 1
    comment = {
        post_id: 7,
        comment_id: 701,
        subcomments: [702],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Charles Mingus - Mingus Ah Um"
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 7,
        comment_id: 702,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "good taste, was just about to comment the same thing"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 7,
        comment_id: 703,
        subcomments: [704],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Idle Moments by Grant Green, no doubt about it."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 7,
        comment_id: 704,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Yes, fantastic album. Absolute classic."
    }
    dumpComment(comment)
}

hardcoded_comments_loader[8] = () => {
    const OP = hardcoded_users.USER1

    // 1
    comment = {
        post_id: 8,
        comment_id: 801,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Most definitely start with Bach and Mozart so you can get a good feel of the genre and know what to expect from that point. People might say try Tchaikovsky but I feel like his music is just flashy and is unsuited for a beginner. Maybe when you've grown accustomed to the entire thing."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 8,
        comment_id: 802,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: `Bach: Goldberg Variations \n
        Mozart: Symphonies 25, 8040, and 41\n
        Beethoven: Symphonies 3, 805, 807, and 9\n
        Chopin: …everything.\n
        Tchaikovsky: Symphony No. 4\n
        Debussy: Clair De Lune\n
        `
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 8,
        comment_id: 803,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "The only answer you need is Bach. And more Bach."
    }
    dumpComment(comment)
}
 
hardcoded_comments_loader[9] = () => {
    const OP = hardcoded_users.USER4
    
    // 1
    comment = {
        post_id: 9,
        comment_id: 901,
        subcomments: [902],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I don't know about you but I hear this one guitar tone in literally every country song known to mankind. If there's anything that would put someone off, it's definitely one of the reasons."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 9,
        comment_id: 902,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "I highly agree on this. It's just the same song copy and pasted without any innovation. It's become like hip-hop imo"
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 9,
        comment_id: 903,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER3,
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
        author: hardcoded_users.USER5,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You'll never find a good country song on the radio. You actually have to actively seek them out. Listen to Colter Wall and Orville Peck on Spotify and you'll see the difference."
    }
    dumpComment(comment)
}

hardcoded_comments_loader[10] = () => {
    const OP = hardcoded_users.USER5
    
    // 1
    comment = {
        post_id: 10,
        comment_id: 1001,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER1,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "You have to understand that most people aren't really passionate about music and will just follow whatever the ongoing trend or fad is. They're only interested in whatever's popular. But you shouldn't care about that. Screw them. Just do you, and your people and the community you belong to will find you."
    }
    dumpComment(comment)

    // 2
    comment = {
        post_id: 10,
        comment_id: 1002,
        subcomments: [1003],

        flags: [],
        author: hardcoded_users.USER2,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Got to be honest, aren't most mainstream rock bands labeled as \"alternative\" or \"indie\" despite them not actually being alternative or independent? Say, like, Radiohead."
    }
    dumpComment(comment)

    // 3
    comment = {
        post_id: 10,
        comment_id: 1003,
        subcomments: [1004],

        flags: [],
        author: hardcoded_users.USER3,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "When every band, even the popular ones got marketed as \"indie\", that word just completely lost its meaning."
    }
    dumpComment(comment)

    // 4
    comment = {
        post_id: 10,
        comment_id: 1004,
        subcomments: [],

        flags: [],
        author: hardcoded_users.USER4,
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "yeah, it's such a broad term that it lost its original meaning"
    }
    dumpComment(comment)
}

module.exports = () => {
    hardcoded_comments = {}

    Object.keys(hardcoded_comments_loader).forEach((post_id) => {
        hardcoded_comments_loader[post_id]()
    })

    return hardcoded_comments
}
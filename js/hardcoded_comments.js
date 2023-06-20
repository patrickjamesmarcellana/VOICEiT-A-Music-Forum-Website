let comments_list = []
const test = () => {
    
    // top level comments (1 - 10)
    // it has two replies
    for(let i = 1; i <= 10; i++) {
        api_recv = {
            comment_id: i,
            subcomments: [100 + i, 200 + i],

            flags: [],
            author: "TestAcc",
            votes: i,
            vote_state: STATE_UPVOTED,
            content: "comment #" + i
        }
        
        dumpComment(api_recv)
        comments_list.push(api_recv.comment_id)
    }

    for(let i = 1; i <= 10; i++) {
        for(let j = 1; j <= 2; j++) { 
            api_recv = {
                comment_id: j * 100 + i,
                subcomments: [],

                flags: [],
                author: "Replier" + j,
                votes: i,
                vote_state: STATE_UPVOTED,
                content: "reply to top-level comment #" + i
            }
            
            dumpComment(api_recv)
        }
    }
    edited_comment = {
            comment_id: 5,
            subcomments: [105, 205],

            flags: ["edited"],
            author: "TestAcc",
            votes: 5,
            vote_state: STATE_UPVOTED,
            content: "comment #5\nEDIT: edited  "
        }
        
    dumpComment(edited_comment)

    downvoted_comment = {
        comment_id: 666666,
        subcomments: [666667],

        flags: [],
        author: "EACommunityTeam",
        votes: -666666,
        vote_state: STATE_DOWNVOTED,
        content: "The intent is to provide players with a sense of pride and accomplishment for unlocking different heroes.\n" +
                "As for cost, we selected initial values based upon data from the Open Beta and other adjustments made to milestone rewards before launch. Among other things, we're looking at average per-player credit earn rates on a daily basis, and we'll be making constant adjustments to ensure that players have challenges that are compelling, rewarding, and of course attainable via gameplay.\n" +
                "We appreciate the candid feedback, and the passion the community has put forth around the current topics here on Reddit, our forums and across numerous social media outlets.\n" + 
                "Our team will continue to make changes and monitor community feedback and update everyone as soon and as often as we can."

    }
    dumpComment(downvoted_comment)
    comments_list.push(downvoted_comment.comment_id)

    for(let i = 666667; i < 666676; i++) {
        violent_reaction = {
            comment_id: i,
            subcomments: [i + 1],

            flags: [],
            author: "User" + i,
            votes: 1,
            vote_state: STATE_NOT_VOTED,
            content: "L"
        }
        dumpComment(violent_reaction)
    }

    violent_reaction = {
        comment_id: 666676,
        subcomments: [],

        flags: [],
        author: "Moderator",
        votes: 1,
        vote_state: STATE_NOT_VOTED,
        content: "Please stop"
    }
    dumpComment(violent_reaction)

    loadAllComment()
}


addEventListener("load", test) 

const Comment = require("./models/Comment")
const Post = require("./models/Post")
const User = require("./models/User")
const Password = require("./models/Password")
mongoose = require("mongoose")


/*
from chatgpt

If the collection name is not explicitly specified when creating a Mongoose model, Mongoose will use the default collection name generated based on the model name.

By default, Mongoose will take the model name, convert it to lowercase, and pluralize it to determine the collection name. For example, if the model name is "Blog", Mongoose will assume the collection name is "blogs".

If the collection with the default name doesn't exist in the MongoDB database, MongoDB will automatically create it when you insert the first document into it.

So, if you don't explicitly specify the collection name when creating the model, Mongoose will use the default naming convention to determine the collection name.

tldr: User -> users
*/
async function test() {
    await mongoose.connect("mongodb://127.0.0.1/voiceit")
    console.log("Connected to DB")

    await mongoose.connection.db.dropDatabase()
    console.log("Erased DB")

    // POPULATE USERS COLLECTION
    const hardcoded_user1 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "melissa_spellman",
        description: "Hi! I'm a neuroscientist student from Johns Hopkins University, and I'm highly invested in how music transcends generations. Currently, my favorite genres of music are classical, jazz, and R&B. Hit me up on my personal email if you'd like to discuss music on your leisure time!\n\nEmail: melissa_spellman@yahoo.com",
        photoUrl: "images/melissa_spellman.jpg",
        lastLogin: new Date(),
        registerDate: new Date("2023-06-21T00:00:00")
    })).save()
    
    const hardcoded_user2 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "draeznor_rock_lover",
        description: "I've been an avid fan of rock and hiphop music since the 1990s. Red Hot Chili Peppers (a rock band) made me become a fan of their music, oh I love them! Eventually, I became a fan of the genre itself.",
        photoUrl: "images/draeznor_rock_lover.jpg",
        lastLogin: new Date(),
        registerDate: new Date("2023-06-22T00:00:00")
    })).save()

    const hardcoded_user3 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "jennie_itgirl",
        description: "An honest kpop fan. Jennie Ruby Jane my idol <3. Posts about kpop and Blackpink in general, but I also love posting about other music genres.",
        photoUrl: "images/jennie_itgirl.jpg",
        lastLogin: new Date(),
        registerDate: new Date("2023-06-23T00:00:00")
    })).save()

    const hardcoded_user4 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "marithus_25",
        description: "Country music is such an underrated genre. Here to spread country music to fellow music listeners! I have also been exploring latin music, and Bad Bunny is such an amazing artist.",
        photoUrl: "images/marithus_25.jpg",
        lastLogin: new Date(),
        registerDate: new Date("2023-06-24T00:00:00")
    })).save()

    const hardcoded_user5 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "aria_eagleheart",
        description: "",
        photoUrl: "images/aria_eagleheart.jpg",
        lastLogin: new Date(),
        registerDate: new Date("2023-06-25T00:00:00")
    })).save()

    console.log("Populated \"users\" table")

    // POPULATE PASSWORDS COLLECTION
    const hardcoded_password1 = await(new Password({
        user: hardcoded_user1._id,
        password: "melissa-12345"
    })).save()

    const hardcoded_password2 = await(new Password({
        user: hardcoded_user2._id,
        password: "draeznor-12345"
    })).save()

    const hardcoded_password3 = await(new Password({
        user: hardcoded_user3._id,
        password: "jennie-12345"
    })).save()
    
    const hardcoded_password4 = await(new Password({
        user: hardcoded_user4._id,
        password: "marithus-12345"
    })).save()

    const hardcoded_password5 = await(new Password({
        user: hardcoded_user5._id,
        password: "aria-12345"
    })).save()

    console.log("Populated \"passwords\" table")

    // POPULATE POSTS COLLECTION
    const hardcoded_post1 = await (new Post({
        user: hardcoded_user5._id,
        title: "Help me ID this pop song that goes \"ay oh ay oh ay oh\"",
        date: new Date("2023-06-21T05:20:30"),
        body: `
        This has been stuck in my head for the past several hours and it's been infuriating. In some part of the song, the male singer sings \"ay oh ay oh ay oh\". I heard it from the mall today so it must be a pop song. It also sounds slightly like EDM. It sounds like it was released around 2012-2015-ish. I've been searching all over Google, Reddit, and YouTube for the past 6 hours and I haven't gotten any close. It is driving me crazy. I will literally give one of my kidneys if any one of you could identify this song. Please help me
        <br>
        I've recorded a sample which I hope helps: https://vocaroo.com/12Y0LTxSjHCr
        `,
        subforum: "pop",
        upvoteCnt: 2,
        downvoteCnt: 0,
        commentCnt: 6
    })).save()

    const hardcoded_post2 = await (new Post({
        user: hardcoded_user2._id,
        title: "Eminem: Recovery or Relapse?",
        date: new Date("2023-06-20T23:18:30"),
        body: `
        Discuss.
        `,
        subforum: "rap",
        upvoteCnt: 3,
        downvoteCnt: 1,
        commentCnt: 4
    })).save()

    const hardcoded_post3 = await (new Post({
        user: hardcoded_user2._id,
        title: "Remember the time when Billboard announced the top 10 rock songs of the 2010s and none of the songs were rock?",
        date: new Date("2023-01-17T04:16:30"),
        body: `
        For context, the list is:<br>
        1. Imagine Dragons - Believer<br>
        2. Imagine Dragons - Thunder<br>
        3. Imagine Dragons - Radioactive<br>
        4. Panic! At The Disco - High Hopes<br>
        5. The Lumineers - Ho Hey<br>
        6. Twenty One Pilots - Heathens<br>
        7. Walk The Moon - Shut Up And Dance<br>
        8. Portugal. The Man - Feel It Still<br>
        9. Twenty One Pilots - Ride<br>
        10. Twenty One Pilots - Stressed Out<br><br>

        What an absolute joke.<br>
        `,
        subforum: "rock",
        upvoteCnt: 1,
        downvoteCnt: 5,
        commentCnt: 3
    })).save()

    const hardcoded_post4 = await (new Post({
        user: hardcoded_user1._id,
        title: "Thoughts on SZA - SOS?",
        date: new Date("2023-02-01T11:15:30"),
        body: `
        I thought it was pretty good. How about you guys?
        `,
        subforum: "rnb",
        upvoteCnt: 12,
        downvoteCnt: 2,
        commentCnt: 3
    })).save()

    const hardcoded_post5 = await (new Post({
        user: hardcoded_user3._id,
        title: "Fifty Fifty becomes longest-charting K-pop girl group on Billboard Hot 100",
        date: new Date("2023-06-26T23:59:59"),
        body: `
        Cupid just broke BLACKPINK and Dua Lipa - Kiss and Make Up's 12-week record on the Billboard Hot 100.
        <br>
        Link: https://en.yna.co.kr/view/AEN20230622002200315
        `,
        subforum: "kpop",
        upvoteCnt: 6,
        downvoteCnt: 1,
        commentCnt: 4
    })).save()

    const hardcoded_post6 = await (new Post({
        user: hardcoded_user4._id,
        title: "How did Bad Bunny blow up?",
        date: new Date("2023-06-26T10:02:30"),
        body: `
        I can't stand this guy. His voice and singing are both bad, and his rapping and songwriting skills are absolutely terrible. I'd be lying if I said he didn't have any good song instrumentals, but apart from that, that's really it. I don't really see anything else of value that would make me like this guy. So can anyone please explain to me why this guy is so big? It really is baffling.
        `,
        subforum: "latin",
        upvoteCnt: 4,
        downvoteCnt: 11,
        commentCnt: 4
    })).save()

    const hardcoded_post7 = await (new Post({
        user: hardcoded_user1._id,
        title: "What album do you think is perfect?",
        date: new Date("2023-06-14T03:33:30"),
        body: `
        For me, Kind of Blue by Miles Davis. Overplayed, sure. Doesn't change a thing, though.
        `,
        subforum: "jazz",
        upvoteCnt: 8,
        downvoteCnt: 0,
        commentCnt: 4
    })).save()

    const hardcoded_post8 = await (new Post({
        user: hardcoded_user1._id,
        title: "How to start listening to classical music?",
        date: new Date("2022-06-26T05:20:30"),
        body: `
        I want to start listening to classical music. Where should one start? Any recommendations would be much appreciated. Thank you!
        `,
        subforum: "classical",
        upvoteCnt: 3,
        downvoteCnt: 0,
        commentCnt: 3
    })).save()

    const hardcoded_post9 = await (new Post({
        user: hardcoded_user4._id,
        title: "Why don't most people don't like country music?",
        date: new Date("2022-12-31T03:16:30"),
        body: `
        I am completely aware that there are some (really) bad country songs out there, but to be fair, all genres have THE bad songs that people laugh at or don't want to talk about. But I really do feel like a lot of people hate country music, more so than any other genre. I sincerely hope that isn't just me thinking that. But anyway, to both country music fans, non-fans, and haters, what do you think puts people off when it comes to country music?
        `,
        subforum: "country",
        upvoteCnt: 5,
        downvoteCnt: 0,
        commentCnt: 4
    })).save()

    const hardcoded_post10 = await (new Post({
        user: hardcoded_user5._id,
        title: "The future of alternative music",
        date: new Date("2023-06-24T17:18:30"),
        body: `
        I find it pretty sad that among my friends, I am the only one who listens to alternative and indie rock. They all just listen to your typical, generic pop and rap. While I respect the fact that people have different tastes, which is quite evident, it makes me feel lonely, like I can't even talk to them about the music I love. Instead, I have to consult strangers on the internet I've never seen or met before. I'm just worried that someday, alternative music will just completely fade into obscurity never to be seen again, and I feel like I will really struggle in relating to other people's tastes in music. Thoughts?
        `,
        subforum: "alternative",
        upvoteCnt: 7,
        downvoteCnt: 2,
        commentCnt: 4
    })).save()

    console.log("Populated \"posts\" table")

    // POPULATE COMMENTS COLLECTION
    const hardcoded_comment1004 = await (new Comment({ post_id: hardcoded_post10, subcomments: [], user: hardcoded_user4._id, body: "yeah, it's such a broad term that it lost its original meaning" } )).save()
    const hardcoded_comment1003 = await (new Comment({ post_id: hardcoded_post10, subcomments: [hardcoded_comment1004.id], user: hardcoded_user3._id, body: "When every band, even the popular ones got marketed as \"indie\", that word just completely lost its meaning." } )).save()
    const hardcoded_comment1002 = await (new Comment({ post_id: hardcoded_post10, subcomments: [hardcoded_comment1003.id], user: hardcoded_user2._id, body: "Got to be honest, aren't most mainstream rock bands labeled as \"alternative\" or \"indie\" despite them not actually being alternative or independent? Say, like, Radiohead." } )).save()
    const hardcoded_comment1001 = await (new Comment({ post_id: hardcoded_post10, subcomments: [], user: hardcoded_user1._id, body: "You have to understand that most people aren't really passionate about music and will just follow whatever the ongoing trend or fad is. They're only interested in whatever's popular. But you shouldn't care about that. Screw them. Just do you, and your people and the community you belong to will find you." } )).save()
    const hardcoded_comment904 = await (new Comment({ post_id: hardcoded_post9, subcomments: [], user: hardcoded_user5._id, body: "You'll never find a good country song on the radio. You actually have to actively seek them out. Listen to Colter Wall and Orville Peck on Spotify and you'll see the difference." } )).save()
    const hardcoded_comment903 = await (new Comment({ post_id: hardcoded_post9, subcomments: [], user: hardcoded_user3._id, body: "The rednecks, the cowboy boots, rednecks, line dancing, rednecks, lyrics no man on Earth would be able to relate to, rednecks, and the extremely simple and repetitive song structure. Oh, did I forget to mention the rednecks?" + "\n" + "Country music is the same old, soulless song filled with boring, bland, and dull cliches produced over and over again by corporations with clearly no regard for quality. There are exceptions, of course, but then again, they are exceptions, not the rule." } )).save()
    const hardcoded_comment902 = await (new Comment({ post_id: hardcoded_post9, subcomments: [], user: hardcoded_user2._id, body: "I highly agree on this. It's just the same song copy and pasted without any innovation. It's become like hip-hop imo" } )).save()
    const hardcoded_comment901 = await (new Comment({ post_id: hardcoded_post9, subcomments: [hardcoded_comment902.id], user: hardcoded_user1._id, body: "I don't know about you but I hear this one guitar tone in literally every country song known to mankind. If there's anything that would put someone off, it's definitely one of the reasons." } )).save()
    const hardcoded_comment803 = await (new Comment({ post_id: hardcoded_post8, subcomments: [], user: hardcoded_user4._id, body: "The only answer you need is Bach. And more Bach." } )).save()
    const hardcoded_comment802 = await (new Comment({ post_id: hardcoded_post8, subcomments: [], user: hardcoded_user3._id, body: `Bach: Goldberg Variations \n Mozart: Symphonies 25, 40, and 41\n Beethoven: Symphonies 3, 5, 7, and 9\n Chopin: …everything.\n Tchaikovsky: Symphony No. 4\n Debussy: Clair De Lune\n ` } )).save()
    const hardcoded_comment801 = await (new Comment({ post_id: hardcoded_post8, subcomments: [], user: hardcoded_user2._id, body: "Most definitely start with Bach and Mozart so you can get a good feel of the genre and know what to expect from that point. People might say try Tchaikovsky but I feel like his music is just flashy and is unsuited for a beginner. Maybe when you've grown accustomed to the entire thing." } )).save()
    const hardcoded_comment704 = await (new Comment({ post_id: hardcoded_post7, subcomments: [], user: hardcoded_user4._id, body: "Yes, fantastic album. Absolute classic." } )).save()
    const hardcoded_comment703 = await (new Comment({ post_id: hardcoded_post7, subcomments: [hardcoded_comment704.id], user: hardcoded_user3._id, body: "Idle Moments by Grant Green, no doubt about it." } )).save()
    const hardcoded_comment702 = await (new Comment({ post_id: hardcoded_post7, subcomments: [], user: hardcoded_user5._id, body: "good taste, was just about to comment the same thing" } )).save()
    const hardcoded_comment701 = await (new Comment({ post_id: hardcoded_post7, subcomments: [hardcoded_comment702.id], user: hardcoded_user2._id, body: "Charles Mingus - Mingus Ah Um" } )).save()
    const hardcoded_comment604 = await (new Comment({ post_id: hardcoded_post6, subcomments: [], user: hardcoded_user5._id, body: "I remember him performing during Royal Rumble 2022. What an absolute waste of time and money. It's just like Maroon 5 and Travis Scott during the Super Bowl LIII halftime show. Unbelievable." } )).save()
    const hardcoded_comment603 = await (new Comment({ post_id: hardcoded_post6, subcomments: [], user: hardcoded_user3._id, body: "Have this downvote." } )).save()
    const hardcoded_comment602 = await (new Comment({ post_id: hardcoded_post6, subcomments: [hardcoded_comment603.id], user: hardcoded_user2._id, body: "no, I agree with him" } )).save()
    const hardcoded_comment601 = await (new Comment({ post_id: hardcoded_post6, subcomments: [hardcoded_comment602.id], user: hardcoded_user1._id, body: "That's just like, your opinion, man. A very shitty one, too." } )).save()
    const hardcoded_comment504 = await (new Comment({ post_id: hardcoded_post5, subcomments: [], user: hardcoded_user5._id, body: "They already signed with Warner Records, so I think they'll do fine" } )).save()
    const hardcoded_comment503 = await (new Comment({ post_id: hardcoded_post5, subcomments: [hardcoded_comment504.id], user: hardcoded_user4._id, body: "Hope they could make something out of this and not just become another artist or group that became viral on TikTok. I wish them all the best." } )).save()
    const hardcoded_comment502 = await (new Comment({ post_id: hardcoded_post5, subcomments: [], user: hardcoded_user1._id, body: "Yes. As much as I love Cupid, I just think Higher is their best song yet. I honestly have trouble getting it out of my head." } )).save()
    const hardcoded_comment501 = await (new Comment({ post_id: hardcoded_post5, subcomments: [hardcoded_comment502.id], user: hardcoded_user2._id, body: "So happy for them. Hope they can keep this up and their other songs get popular as well." } )).save()
    const hardcoded_comment403 = await (new Comment({ post_id: hardcoded_post4, subcomments: [], user: hardcoded_user4._id, body: "I like it, but it's definitely too long. CTRL > SOS. 7-8/10" } )).save()
    const hardcoded_comment402 = await (new Comment({ post_id: hardcoded_post4, subcomments: [], user: hardcoded_user2._id, body: "Loved it. Even the ones I skipped on re-listens, I like them." } )).save()
    const hardcoded_comment401 = await (new Comment({ post_id: hardcoded_post4, subcomments: [], user: hardcoded_user3._id, body: "I honestly loved it. It's the perfect post-breakup album, so it really spoke to me. I love her so much." } )).save()
    const hardcoded_comment303 = await (new Comment({ post_id: hardcoded_post3, subcomments: [], user: hardcoded_user5._id, body: "Nah, pop-rock is Blink 182, early One Republic, Fall Out Boy, and Coldplay, not that garbage" } )).save()
    const hardcoded_comment302 = await (new Comment({ post_id: hardcoded_post3, subcomments: [hardcoded_comment303.id], user: hardcoded_user4._id, body: "They're usually considered pop-rock, but they're just stylish pop imo" } )).save()
    const hardcoded_comment301 = await (new Comment({ post_id: hardcoded_post3, subcomments: [hardcoded_comment302.id], user: hardcoded_user3._id, body: "Wait, Imagine Dragons is a rock band?" } )).save()
    const hardcoded_comment204 = await (new Comment({ post_id: hardcoded_post2, subcomments: [], user: hardcoded_user4._id, body: "frfr" } )).save()
    const hardcoded_comment203 = await (new Comment({ post_id: hardcoded_post2, subcomments: [hardcoded_comment204.id], user: hardcoded_user3._id, body: "Recovery gang" } )).save()
    const hardcoded_comment202 = await (new Comment({ post_id: hardcoded_post2, subcomments: [], user: hardcoded_user1._id, body: "L take" } )).save()
    const hardcoded_comment201 = await (new Comment({ post_id: hardcoded_post2, subcomments: [hardcoded_comment202.id], user: hardcoded_user5._id, body: "Relapse, hands down. Better production, flows, and lyrics. Recovery has its hooks and choruses literally catered to 14-year-old girls. Em hasn't topped Relapse yet. Screw Recovery. " } )).save()
    const hardcoded_comment106 = await (new Comment({ post_id: hardcoded_post1, subcomments: [], user: hardcoded_user5._id, body: "I don't think it's too EDM-y like that one" } )).save()
    const hardcoded_comment105 = await (new Comment({ post_id: hardcoded_post1, subcomments: [hardcoded_comment106.id], user: hardcoded_user4._id, body: "Roses by the Chainsmokers maybe?" } )).save()
    const hardcoded_comment104 = await (new Comment({ post_id: hardcoded_post1, subcomments: [], user: hardcoded_user5._id, body: "Sorry, it's not it" } )).save()
    const hardcoded_comment103 = await (new Comment({ post_id: hardcoded_post1, subcomments: [hardcoded_comment104.id], user: hardcoded_user3._id, body: "This has to be Zedd - Clarity. Check the part around 1:09" } )).save()
    const hardcoded_comment102 = await (new Comment({ post_id: hardcoded_post1, subcomments: [], user: hardcoded_user2._id, body: "lmao I seriously can't tell if you're being sarcastic or not, but I just woke up my kids from laughing so hard" } )).save()
    const hardcoded_comment101 = await (new Comment({ post_id: hardcoded_post1, subcomments: [hardcoded_comment102.id], user: hardcoded_user1._id, body: "You sure it's not Bastille - Pompeii?" } )).save()
    console.log("Populated \"comments\" table")

    await Post.findOneAndUpdate({_id: hardcoded_post1._id}, {top_level_comments_list: [hardcoded_comment101.id, hardcoded_comment103.id, hardcoded_comment105.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post2._id}, {top_level_comments_list: [hardcoded_comment201.id, hardcoded_comment203.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post3._id}, {top_level_comments_list: [hardcoded_comment301.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post4._id}, {top_level_comments_list: [hardcoded_comment401.id, hardcoded_comment402.id, hardcoded_comment403.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post5._id}, {top_level_comments_list: [hardcoded_comment501.id, hardcoded_comment503.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post6._id}, {top_level_comments_list: [hardcoded_comment601.id, hardcoded_comment604.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post7._id}, {top_level_comments_list: [hardcoded_comment701.id, hardcoded_comment703.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post8._id}, {top_level_comments_list: [hardcoded_comment801.id, hardcoded_comment802.id, hardcoded_comment803.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post9._id}, {top_level_comments_list: [hardcoded_comment901.id, hardcoded_comment903.id, hardcoded_comment904.id]})
    await Post.findOneAndUpdate({_id: hardcoded_post10._id}, {top_level_comments_list: [hardcoded_comment1001.id, hardcoded_comment1002.id]})
    console.log("Set top-level comments of posts")

    process.exit(0)
}

test();
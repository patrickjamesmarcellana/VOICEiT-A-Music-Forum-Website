const Post = require("./models/Post")
const User = require("./models/User")
const hardcoded_users = require("./hardcoded/hardcoded_users")
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
        username: hardcoded_users.USER1,
        description: "Hi! I'm a neuroscientist student from Johns Hopkins University, and I'm highly invested in how music transcends generations. Currently, my favorite genres of music are classical, jazz, and R&B. Hit me up on my personal email if you'd like to discuss music on your leisure time!\n\nEmail: melissa_spellman@yahoo.com",
        photoUrl: "images/melissa_spellman.jpg"
    })).save()
    
    const hardcoded_user2 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username:  hardcoded_users.USER2,
        description: "I've been an avid fan of rock and hiphop music since the 1990s. Red Hot Chili Peppers (a rock band) made me become a fan of their music, oh I love them! Eventually, I became a fan of the genre itself.",
        photoUrl: "images/draeznor_rock_lover.jpg"
    })).save()

    const hardcoded_user3 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username:  hardcoded_users.USER3,
        description: "An honest kpop fan. Jennie Ruby Jane my idol <3. Posts about kpop and Blackpink in general, but I also love posting about other music genres.",
        photoUrl: "images/jennie_itgirl.jpg"
    })).save()

    const hardcoded_user4 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username:  hardcoded_users.USER4,
        description: "Country music is such an underrated genre. Here to spread country music to fellow music listeners! I have also been exploring latin music, and Bad Bunny is such an amazing artist.",
        photoUrl: "images/marithus_25.jpg"
    })).save()

    const hardcoded_user5 = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username:  hardcoded_users.USER5,
        description: "",
        photoUrl: "images/aria_eagleheart.jpg"
    })).save()
    console.log("Populated \"users\" table")

    // POPULATE POSTS COLLECTION
    await (new Post({
        user: hardcoded_user5._id,
        title: "Help me ID this pop song that goes \"ay oh ay oh ay oh\"",
        date: new Date("2023-06-21T05:20:30"),
        body: `
        This has been stuck in my head for the past several hours and it's been infuriating. In some part of the song, the male singer sings \"ay oh ay oh ay oh\". I heard it from the mall today so it must be a pop song. It also sounds slightly like EDM. It sounds like it was released around 2012-2015-ish. I've been searching all over Google, Reddit, and YouTube for the past 6 hours and I haven't gotten any close. It is driving me crazy. I will literally give one of my kidneys if any one of you could identify this song. Please help me
        <br>
        I've recorded a sample which I hope helps: https://vocaroo.com/12Y0LTxSjHCr
        `,
        subforum: "pop",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 6
    })).save()

    await (new Post({
        user: hardcoded_user2._id,
        title: "Eminem: Recovery or Relapse?",
        date: new Date("2023-06-20T23:18:30"),
        body: `
        Discuss.
        `,
        subforum: "rap",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    await (new Post({
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
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 3
    })).save()

    await (new Post({
        user: hardcoded_user1._id,
        title: "Thoughts on SZA - SOS?",
        date: new Date("2023-02-01T11:15:30"),
        body: `
        I thought it was pretty good. How about you guys?
        `,
        subforum: "rnb",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 3
    })).save()

    await (new Post({
        user: hardcoded_user3._id,
        title: "Fifty Fifty becomes longest-charting K-pop girl group on Billboard Hot 100",
        date: new Date("2023-06-26T23:59:59"),
        body: `
        Cupid just broke BLACKPINK and Dua Lipa - Kiss and Make Up's 12-week record on the Billboard Hot 100.
        <br>
        Link: https://en.yna.co.kr/view/AEN20230622002200315
        `,
        subforum: "kpop",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    await (new Post({
        user: hardcoded_user4._id,
        title: "How did Bad Bunny blow up?",
        date: new Date("2023-06-26T10:02:30"),
        body: `
        I can't stand this guy. His voice and singing are both bad, and his rapping and songwriting skills are absolutely terrible. I'd be lying if I said he didn't have any good song instrumentals, but apart from that, that's really it. I don't really see anything else of value that would make me like this guy. So can anyone please explain to me why this guy is so big? It really is baffling.
        `,
        subforum: "latin",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    await (new Post({
        user: hardcoded_user1._id,
        title: "What album do you think is perfect?",
        date: new Date("2023-06-14T03:33:30"),
        body: `
        For me, Kind of Blue by Miles Davis. Overplayed, sure. Doesn't change a thing, though.
        `,
        subforum: "jazz",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    await (new Post({
        user: hardcoded_user1._id,
        title: "How to start listening to classical music?",
        date: new Date("2022-06-26T05:20:30"),
        body: `
        I want to start listening to classical music. Where should one start? Any recommendations would be much appreciated. Thank you!
        `,
        subforum: "classical",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 3
    })).save()

    await (new Post({
        user: hardcoded_user4._id,
        title: "Why don't most people don't like country music?",
        date: new Date("2022-12-31T03:16:30"),
        body: `
        I am completely aware that there are some (really) bad country songs out there, but to be fair, all genres have THE bad songs that people laugh at or don't want to talk about. But I really do feel like a lot of people hate country music, more so than any other genre. I sincerely hope that isn't just me thinking that. But anyway, to both country music fans, non-fans, and haters, what do you think puts people off when it comes to country music?
        `,
        subforum: "country",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    await (new Post({
        user: hardcoded_user5._id,
        title: "The future of alternative music",
        date: new Date("2023-06-24T17:18:30"),
        body: `
        I find it pretty sad that among my friends, I am the only one who listens to alternative and indie rock. They all just listen to your typical, generic pop and rap. While I respect the fact that people have different tastes, which is quite evident, it makes me feel lonely, like I can't even talk to them about the music I love. Instead, I have to consult strangers on the internet I've never seen or met before. I'm just worried that someday, alternative music will just completely fade into obscurity never to be seen again, and I feel like I will really struggle in relating to other people's tastes in music. Thoughts?
        `,
        subforum: "alternative",
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 4
    })).save()

    // populate "user" fields of posts
    await Post.findOne({
        user: hardcoded_user5._id,
        title: "Help me ID this pop song that goes \"ay oh ay oh ay oh\"",
        date: new Date("2023-06-21T05:20:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user2._id,
        title: "Eminem: Recovery or Relapse?",
        date: new Date("2023-06-20T23:18:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user2._id,
        title: "Remember the time when Billboard announced the top 10 rock songs of the 2010s and none of the songs were rock?",
        date: new Date("2023-01-17T04:16:30")
    }).populate("user").exec()

    await Post.findOne({
        ser: hardcoded_user1._id,
        title: "Thoughts on SZA - SOS?",
        date: new Date("2023-02-01T11:15:30"),
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user3._id,
        title: "Fifty Fifty becomes longest-charting K-pop girl group on Billboard Hot 100",
        date: new Date("2023-06-26T23:59:59"),
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user4._id,
        title: "How did Bad Bunny blow up?",
        date: new Date("2023-06-26T10:02:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user1._id,
        title: "What album do you think is perfect?",
        date: new Date("2023-06-14T03:33:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user1._id,
        title: "How to start listening to classical music?",
        date: new Date("2022-06-26T05:20:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user4._id,
        title: "Why don't most people don't like country music?",
        date: new Date("2022-12-31T03:16:30")
    }).populate("user").exec()

    await Post.findOne({
        user: hardcoded_user5._id,
        title: "The future of alternative music",
        date: new Date("2023-06-24T17:18:30")
    }).populate("user").exec()

    console.log("Populated \"posts\" table")


    await mongoose.connection.close()
}

test();
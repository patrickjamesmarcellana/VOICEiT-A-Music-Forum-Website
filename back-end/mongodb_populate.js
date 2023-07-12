const Post = require("./models/Post")
const User = require("./models/User")
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
    const user_melissa = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "melissa_spellman",
        description: "Hi! I'm a neuroscientist student from Johns Hopkins University, and I'm highly invested in how music transcends generations. Currently, my favorite genres of music are classical, jazz, and R&B. Hit me up on my personal email if you'd like to discuss music on your leisure time!\n\nEmail: melissa_spellman@yahoo.com",
        photoUrl: "images/melissa_spellman.jpg"
    })).save()
    
    const user_draeznor = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "draeznor_rock_lover",
        description: "I've been an avid fan of rock and hiphop music since the 1990s. Red Hot Chili Peppers (a rock band) made me become a fan of their music, oh I love them! Eventually, I became a fan of the genre itself.",
        photoUrl: "images/draeznor_rock_lover.jpg"
    })).save()

    const user_jennie = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "jennie_itgirl",
        description: "An honest kpop fan. Jennie Ruby Jane my idol <3. Posts about kpop and Blackpink in general, but I also love posting about other music genres.",
        photoUrl: "images/jennie_itgirl.jpg"
    })).save()

    const user_marithus = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "marithus_25",
        description: "Country music is such an underrated genre. Here to spread country music to fellow music listeners! I have also been exploring latin music, and Bad Bunny is such an amazing artist.",
        photoUrl: "images/marithus_25.jpg"
    })).save()

    const user_aria = await (new User({
        _id: new mongoose.Types.ObjectId(),
        username: "aria_eagleheart",
        description: "",
        photoUrl: "images/aria_eagleheart.jpg"
    })).save()
    console.log("Populated \"users\" table")

    // POPULATE POSTS COLLECTION
    const new_post = await (new Post({
        user: user_aria._id,
        title: "Help me ID this pop song that goes \"ay oh ay oh ay oh\"",
        body: `This has been stuck in my head for the past several hours and it's been infuriating. In some part of the song, the male singer sings \"ay oh ay oh ay oh\". I heard it from the mall today so it must be a pop song. It also sounds slightly like EDM. It sounds like it was released around 2012-2015-ish. I've been searching all over Google, Reddit, and YouTube for the past 6 hours and I haven't gotten any close. It is driving me crazy. I will literally give one of my kidneys if any one of you could identify this song. Please help me
        I've recorded a sample which I hope helps: https://vocaroo.com/12Y0LTxSjHCr`,
        subforum: "pop",
        date: new Date("2023-06-21T05:20:30"),
        upvoteCnt: 5,
        downvoteCnt: 5,
        commentCnt: 6
    })).save()

    const post_find = await Post.findOne({
        user: user_aria._id,
        title: "Help me ID this pop song that goes \"ay oh ay oh ay oh\"",
        date: new Date("2023-06-21T05:20:30")
    }).populate("user").exec()

    await mongoose.connection.close()
}

test();
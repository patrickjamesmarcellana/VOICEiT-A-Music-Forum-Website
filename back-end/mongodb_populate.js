mongoose = require("mongoose")
User = require("./models/User")

/*
from chatgpt

If the collection name is not explicitly specified when creating a Mongoose model, Mongoose will use the default collection name generated based on the model name.

By default, Mongoose will take the model name, convert it to lowercase, and pluralize it to determine the collection name. For example, if the model name is "Blog", Mongoose will assume the collection name is "blogs".

If the collection with the default name doesn't exist in the MongoDB database, MongoDB will automatically create it when you insert the first document into it.

So, if you don't explicitly specify the collection name when creating the model, Mongoose will use the default naming convention to determine the collection name.

tldr: User -> users
*/
async function test() {
    await mongoose.connect("mongodb://localhost/voiceit")
    console.log("Connected to DB")

    await mongoose.connection.db.dropDatabase()
    console.log("Erased DB")

    await (new User({
        username: "melissa_spellman",
        description: "Hi! I'm a neuroscientist student from Johns Hopkins University, and I'm highly invested in how music transcends generations. Currently, my favorite genres of music are classical, jazz, and R&B. Hit me up on my personal email if you'd like to discuss music on your leisure time!\n\nEmail: melissa_spellman@yahoo.com",
        photoUrl: "images/melissa_spellman.jpg"
    })).save()
    
    await (new User({
        username: "draeznor_rock_lover",
        description: "I've been an avid fan of rock and hiphop music since the 1990s. Red Hot Chili Peppers (a rock band) made me become a fan of their music, oh I love them! Eventually, I became a fan of the genre itself.",
        photoUrl: "images/draeznor_rock_lover.jpg"
    })).save()

    await (new User({
        username: "jennie_itgirl",
        description: "An honest kpop fan. Jennie Ruby Jane my idol <3. Posts about kpop and Blackpink in general, but I also love posting about other music genres.",
        photoUrl: "images/jennie_itgirl.jpg"
    })).save()

    await (new User({
        username: "marithus_25",
        description: "Country music is such an underrated genre. Here to spread country music to fellow music listeners! I have also been exploring latin music, and Bad Bunny is such an amazing artist.",
        photoUrl: "images/marithus_25.jpg"
    })).save()

    await (new User({
        username: "aria_eagleheart",
        description: "aria_eagleheart",
        photoUrl: "images/aria_eagleheart.jpg"
    })).save()
    console.log("Populated \"users\" table")

    await mongoose.connection.close()
}

test();
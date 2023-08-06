const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const Password = require("../models/Password")
const mongoose = require("mongoose")
const fs = require('fs')
const { EJSON } = require("bson")
const validate = require("./validator")

async function export_model(model, path) {
    await validate(model)
    const documents = await model.find({}).exec()
    const converted = []

    for(let i = 0; i < documents.length; i++) {
        converted.push(documents[i]._doc)
    }
    const text = EJSON.stringify(converted, null, 2)
    fs.writeFileSync(path, text)
}
async function populate() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB")

    await export_model(Comment, "./back-end/db/voiceit.comments.json")
    await export_model(Post, "./back-end/db/voiceit.posts.json")
    await export_model(User, "./back-end/db/voiceit.users.json")
    await export_model(Password, "./back-end/db/voiceit.passwords.json")

    process.exit(0)
}

populate(); 
 

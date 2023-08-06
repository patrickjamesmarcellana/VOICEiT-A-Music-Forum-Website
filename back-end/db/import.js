const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const Password = require("../models/Password")
const mongoose = require("mongoose")
const fs = require('fs')
const { EJSON } = require("bson")
const validate = require("./validator")

async function populate_model(model, path) {
    const data = fs.readFileSync(path)
    const json = EJSON.parse(data)

    await model.collection.insertMany(json)
    await validate(model)
}
async function populate() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB")

    await mongoose.connection.db.dropDatabase()
    console.log("Erased DB")

    await populate_model(Comment, "./back-end/db/voiceit.comments.json")
    await populate_model(Post, "./back-end/db/voiceit.posts.json")
    await populate_model(User, "./back-end/db/voiceit.users.json")
    await populate_model(Password, "./back-end/db/voiceit.passwords.json")

    process.exit(0)
}

populate(); 

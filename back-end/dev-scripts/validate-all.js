const Comment = require("../models/Comment")
const Post = require("../models/Post")
const Vote = require("../models/Vote")
const User = require("../models/User")
const Password = require("../models/Password")
require('dotenv').config()

mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log(`Mongoose connected to DB`)
    await validateDocuments(Comment)
    await validateDocuments(Post)
    await validateDocuments(Vote)
    await validateDocuments(User)
    await validateDocuments(Password)
    process.exit(0)
})

validateDocuments = async (model) => {
    const documents = await model.find({}).exec()

    console.log(`Validating ${documents.length} documents from ${model.modelName} model`)
    for(let i = 0;  i < documents.length; i++) {
        if(documents[i].validateSync() !== undefined) {
            console.log(`Error detected on ${model.modelName} id: ${documents[i]._id}`)
        }
        
    }
}

 

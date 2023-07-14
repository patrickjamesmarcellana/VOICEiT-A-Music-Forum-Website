const express = require("express")
const app = express()
const port = 8080

mongoose = require("mongoose")
User = require("./models/User")

app.use(express.static('./front-end'))

const posts_router = require("./routes/posts")
app.use("/api/posts", posts_router)

const comments_router = require("./routes/comments")
app.use("/api/comments", comments_router)

const users_router = require("./routes/users")
app.use("/api/users", users_router)

mongoose.connect("mongodb://127.0.0.1/voiceit").then(() => {
    console.log(`Mongoose connected to DB`)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const express = require("express")
const session = require("express-session")
const passport = require('passport')
const passport_loader = require("./passport_loader")

const app = express()
const port = 8080

mongoose = require("mongoose")
User = require("./models/User")

// body parser is needed to decode POST requests (such as login)
const bodyparser = require('body-parser');
app.use(bodyparser.json()) // decode JSON requests (from JS front end code usually)
app.use(bodyparser.urlencoded({ extended: true })) // decode form data (from HTML forms usually)

// session management
app.use(session({
    secret: 'do not hardcode this',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
    store: new session.MemoryStore()
}));



// extract user authentication from the session
// this applies to all succeeding requests
app.use(passport.authenticate('session'));

// tell client that it is logged in
app.use((req, res, next) => {
    if(req.user) {
        res.cookie("logged_in_as", req.user.username, {httpOnly: false /* make cookie visible to client JS */})
    } else {
        // client might have a leftover logged in cookie (session expired, forcibly logged out, etc), empty it
        res.cookie("logged_in_as", "", {httpOnly: false})
    }
    next()
})
app.use(express.static('./front-end'))

const auth_router = require("./routes/auth")
app.use("/api/auth", auth_router)

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

const Constants = require("./constants")
const express = require("express")
const session = require("express-session")
const passport = require('passport')
const passport_loader = require("./passport_loader")
const MongoStore = require('connect-mongo')
require('dotenv').config()

const app = express()

mongoose = require("mongoose")
User = require("./models/User")

// body parser is needed to decode POST requests (such as login)
const bodyparser = require('body-parser');
app.use(bodyparser.json()) // decode JSON requests (from JS front end code usually)
app.use(bodyparser.urlencoded({ extended: true })) // decode form data (from HTML forms usually)

// allow the usage of HTTP PATCH in HTML forms
const methodOverride = require('method-override')
app.use(methodOverride("_method"))

// session management
app.use(session({
    secret: 'do not hardcode this',
    resave: false,
    saveUninitialized: false,

    // save all logged-in browser sessions to MongoDB
    //
    // note: connect-mongo automatically removes sessions that have expired (set by cookie maxAge)
    //       no need to manually clean-up the DB
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_SESSIONSTORE_URI, 
        ttl: Constants.SESSION_TIMEOUT_SECS, // seconds of inactivity before the session is deleted from the DB
    }),

    // reset the session expiration time every time the user connects to the website
    rolling: true,

    /* when the expiration time is changed, the corresponding cookie in the DB is not updated by default (still has old expiration)
        example:
            _id: "_y3dnzLgWOYm_Xeg40gBEDTPje5qJMNC"
            expires: 2023-07-20T09:28:58.978+00:00
            session "{"cookie":{"originalMaxAge":300000,"expires":"2023-07-20T09:28:50.376Z…"

        the expiration of the MongoDB document is correct tho 

        Note: having an incorrect cookie entry in the DB does not break anything (tested by setting session.expires to the year 2000)
              but it is better to keep the corresponding DB entry in sync
    */
    resave: true,

    //cookie: { secure: true }
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

const submit_router = require("./routes/submit")
app.use("/api/submit", submit_router)

const delete_router = require("./routes/delete")
app.use("/api/delete", delete_router)

const vote_router = require("./routes/vote")
app.use("/api/vote", vote_router)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Mongoose connected to DB`)
})
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

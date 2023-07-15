const passport = require("passport");
const LocalStrategy = require("passport-local");

const Password = require("./models/Password")
const Session = require("./models/Session")
const User = require("./models/Session")

passport.use(new LocalStrategy(async function(username, password, cb) {
    const user_info = await User.findOne({username: req.params.user}).exec()
    if(user_info != null) {
        // send entire user object
        cb(null, user_info)
    } else {
        cb(null, null) // todo: add error messages
    }
}))

passport.serializeUser(async function(user, cb) {
    // only include the internal user id
    cb(null, user._id)
})

passport.deserializeUser(async function(user_id, cb) {
    const user_info = await User.findById(user_id).exec()
    if(user_info != null) {
        cb(null, user_info)
    } else {
        cb("error")
    }
})
module.exports = null

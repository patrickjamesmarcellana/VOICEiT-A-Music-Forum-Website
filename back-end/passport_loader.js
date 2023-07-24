const passport = require("passport");
const LocalStrategy = require("passport-local");

const Password = require("./models/Password")
const User = require("./models/User")


passport.use(new LocalStrategy(async function(username, password, cb) {
    const user_info = await User.findOne({username: username}).exec()
    if(user_info != null) {
        const password_info = await Password.findOne({user: user_info._id}).exec()

        if(password_info != null && await password_info.comparePassword(password)) {
            // send entire user object
            cb(null, user_info)
        } else {
            cb(null, null) // todo: add error messages
        }
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
        console.log(`WARN: deserialization of user_id ${user_id} failed`)
        cb(null, null)
    }
})
module.exports = null

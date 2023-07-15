const router = require("express").Router()
const passport = require('passport')

const Password = require("../models/Password")
const User = require("../models/User")

router.post("/register",  async (req, res) => {
    // todo: validation
    try {
        await User.validate({
            username: req.body.username
        })

        // if ok:
        const newUser = await User.create({
            username: req.body.username
        })

        // todo: validate password
    } catch(e) {
        console.log(e)
    }


})

router.post("/login", passport.authenticate("Local", {
    successRedirect: "/",
    failureRedirect: "login.html",
}))

module.exports = router

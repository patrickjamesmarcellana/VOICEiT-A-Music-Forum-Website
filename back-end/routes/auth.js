const router = require("express").Router()
const passport = require('passport')

const Password = require("../models/Password")
const User = require("../models/User")

router.post("/register",  async (req, res) => {
    // todo: validation
    try {
        await User.validate({
            username: req.body["username"]
        })

        // if ok:
        const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body["username"]
        }).save()
        console.log("user successfully created")
        res.redirect("/index.html")
        // todo: validate password, 
        // also create a new document in passwords collection, 
        // store hashed password
        // redirect the user to index.html but make it logged in

        // don't forget to populate user
    } catch(e) {
        console.log(e)
    }


})

router.post("/login", 
    passport.authenticate("local", {}), 
    (req, res) => { res.sendStatus(200) })

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if(!err) {
            res.sendStatus(200);
        } else {
            console.log("Error while logging out")
            console.log(err)
        }
    })
})
module.exports = router

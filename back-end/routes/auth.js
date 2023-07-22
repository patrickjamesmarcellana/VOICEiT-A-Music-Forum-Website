const router = require("express").Router();
const passport = require("passport");

const Password = require("../models/Password");
const User = require("../models/User");

router.post("/register", async (req, res) => {
    // todo: validation
    try {
        await User.validate({
            username: req.body["username"],
        });

        // if ok:
        const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body["username"],
        }).save();

        const newPassword = await new Password({
            user: newUser._id,
            password: req.body["password"],
        }).save();
        console.log("user successfully created");
        res.sendStatus(200);
        // todo: validate password,
        // redirect the user to index.html but make it logged in

        // don't forget to populate user
    } catch (e) {
        console.error(e);

        if (e.code === 11000 && e.keyPattern["username"] === 1) {
            res.status(401).send("Username exists");
            return;
        }

        if (Object.keys(e.errors)[0] === "username") {
            res.status(401).send("Username format invalid");
            return;
        }
    }
});

router.post("/login", passport.authenticate("local", {}), async (req, res) => {
    const new_date = Date.now();

    const user = await User.findOneAndUpdate(
        { username: req.body["username"] },
        { lastLogin: new_date }
    );

    console.log("Updated login time");
    res.sendStatus(200);
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log("Error while logging out");
            console.log(err);
        }
    });
});

module.exports = router;

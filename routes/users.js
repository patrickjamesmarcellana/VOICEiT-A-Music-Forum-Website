const router = require("express").Router()

router.get("/:user", async (req, res) => {
    console.log("Request for user", req.params.user)
    const user_results = await User.find({username: req.params.user})
    if(user_results.length > 0) {
        const json = {
            username: user_results[0].username,
            description: user_results[0].description,
            photoUrl: user_results[0].photoUrl
        }
        res.send(json)
    } else {
        res.sendStatus(404)
    }
}) 

module.exports = router

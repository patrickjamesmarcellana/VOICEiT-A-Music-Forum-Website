const router = require("express").Router()

const hardcoded_comments = require("../hardcoded/hardcoded_comments")()

router.get('/id/:id', (req, res) => {
    console.log("Request for comment by id", req.params.id)

    const json = hardcoded_comments[req.params.id]

    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

router.get("/user/:user", (req, res) => {
    console.log("Request for comments by user", req.params.user)
    let json = Object.values(hardcoded_comments).filter((comment) => (comment.author === req.params.user));

    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
const router = require("express").Router()

const hardcoded_posts = require("../hardcoded/hardcoded_posts")()
const hardcoded_comments = require("../hardcoded/hardcoded_comments")()

// performs a DFS to count comments
// TODO: move this to the DB itself?
const comment_count = (comments_list) => {
    if (comments_list.length == 0) {
        return 0;
    } else {
        let count = comments_list.length
        comments_list.forEach((x) => (count += comment_count(hardcoded_comments[x].subcomments)))
        return count
    }
}

router.get("/id/:id", (req, res) => {
    console.log("Request for post by id", req.params.id)
    let json = [hardcoded_posts[req.params.id]]
    json[0].comment_count = comment_count(json[0].top_level_comments_list)

    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

router.get("/user/:user", (req, res) => {
    console.log("Request for posts by user", req.params.user)
    let json = Object.values(hardcoded_posts).filter((post) => (post.op === req.params.user));
    json.forEach(post => post.comment_count = comment_count(post.top_level_comments_list))

    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

router.get("/subforum/:subforum", (req, res) => {
    console.log("Request for posts by subforum", req.params.subforum)
    function compare_date(d1, d2) {
        return new Date(d2.date) - new Date(d1.date);
    }
    
    function compare_comment_count(c1, c2) {
        return c2.comment_count - c1.comment_count;
    }

    hardcoded_posts_list = Object.values(hardcoded_posts)
    hardcoded_posts_list.forEach(post => post.comment_count = comment_count(post.top_level_comments_list))
    if(req.params.subforum === "home") {
        json = hardcoded_posts_list.sort(compare_date)
    } else if(req.params.subforum === "popular"){
        json = hardcoded_posts_list.sort(compare_comment_count)
    } else {
        json = hardcoded_posts_list.filter(post => post.subforum === req.params.subforum)
    }
    

    if(json !== undefined) {
        res.send(json)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router

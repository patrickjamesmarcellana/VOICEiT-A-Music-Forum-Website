$(document).ready(function() {
    const search_params = new URLSearchParams(window.location.search)
    target_user = search_params.get("user")

    // note: .op is for post, .author is for comment (fix this)
    // note 2: post is a global variable containing all the posts for some reason
    // note 3: same for saved_comments
    const posts_list = Object.entries(posts).filter((kvpair) => (kvpair[1].op === target_user));
    const comments_list = Object.entries(saved_comments).filter((kvpair) => (kvpair[1].author === target_user));
    for (let [post_id, post] of posts_list) {
        insert_post(post_id)
    }
    
    for (let [comment_id, comment] of comments_list) {
        renderComment(comment_id, document.querySelector(".post-panel"))
    }
})
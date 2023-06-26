$(document).ready(function() {
    const search_params = new URLSearchParams(window.location.search)
    target_user = search_params.get("user")

    // note: .op is for post, .author is for comment (fix this)
    // note 2: post is a global variable containing all the posts for some reason
    // note 3: same for saved_comments
    const post_id_list = Object.keys(posts).filter((post_id) => (posts[post_id].op === target_user));
    
    const comments_list = Object.entries(saved_comments).filter((kvpair) => (kvpair[1].author === target_user));

    // find post the comment belongs to
    for (let [comment_id, comment] of comments_list) {
        if(comment.post_id != null && !post_id_list.includes(comment.post_id.toString())) { // todo: optimize
            post_id_list.push(comment.post_id);
        }
    }
    for (let post_id of post_id_list) {
        insert_post(post_id)
    }
    
    for (let [comment_id, comment] of comments_list) {
        renderComment(comment_id, document.querySelector(`div[post-id="${comment.post_id}"]`), undefined, ["dont-render-subcomments"])
    }
})
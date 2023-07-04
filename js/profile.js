// allegedly an enum
ProfileMode = {
    get MODE_OVERVIEW() {
        return 0;
    },
    get MODE_POSTS() {
        return 1;
    },
    get MODE_COMMENTS() {
        return 2;
    }
}


function render_profile(mode) {
    // note: .op is for post, .author is for comment (fix this)
    // note 2: post is a global variable containing all the posts for some reason
    // note 3: same for saved_comments

    // 0. wipe
    $(".profile-user-posts").html("")

    // 1. add posts by user
    let post_id_list = [];
    if (mode == ProfileMode.MODE_OVERVIEW || mode == ProfileMode.MODE_POSTS) {
        post_id_list = Object.keys(posts).filter((post_id) => (posts[post_id].op === target_user));
    }
    
    // 2. add comments by user
    let comments_list = [];
    if (mode == ProfileMode.MODE_OVERVIEW || mode == ProfileMode.MODE_COMMENTS) {
        comments_list = Object.entries(saved_comments).filter((kvpair) => (kvpair[1].author === target_user));

        // find post the comment belongs to
        for (let [comment_id, comment] of comments_list) {
            if(comment.post_id != null && !post_id_list.includes(comment.post_id.toString())) { // todo: optimize
                post_id_list.push(comment.post_id);
            }
        }
    }

    // 3. render both
    for (let post_id of post_id_list) {
        insert_post(post_id, ".profile-user-posts")
    }
    
    for (let [comment_id, comment] of comments_list) {
        (new commentViewManager(null)).insert_comment(getComment(comment_id), document.querySelector(`div[post-id="${comment.post_id}"]`))
    }
}

$(document).ready(function() {
    const search_params = new URLSearchParams(window.location.search)
    target_user = search_params.get("user")

    $("#profile-overview-button").click(function() {
        render_profile(ProfileMode.MODE_OVERVIEW)
    })
    $("#profile-posts-button").click(function() {
        render_profile(ProfileMode.MODE_POSTS)
    })
    $("#profile-comments-button").click(function() {
        render_profile(ProfileMode.MODE_COMMENTS)
    })

    render_profile(ProfileMode.MODE_OVERVIEW)
})
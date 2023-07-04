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


async function render_profile(mode) {
    // note: .op is for post, .author is for comment (fix this)
    // note 2: post is a global variable containing all the posts for some reason
    // note 3: same for saved_comments

    // 0. wipe
    $(".profile-user-posts").html("")

    // 1. add posts by user
    let post_id_list = [];
    let post_list = [];
    if (mode == ProfileMode.MODE_OVERVIEW || mode == ProfileMode.MODE_POSTS) {
        post_list = await postManager.getUserPosts(target_user)
        post_id_list = post_list.map(post => post.post_id)
    }
    
    // 2. add comments by user
    let comments_list = [];
    if (mode == ProfileMode.MODE_OVERVIEW || mode == ProfileMode.MODE_COMMENTS) {
        comments_list = await commentManager.getUserComments(target_user)

        // find post the comment belongs to
        for (const comment of comments_list) {
            if(comment.post_id != null && !post_id_list.includes(comment.post_id.toString())) { // todo: optimize
                post_id_list.push(comment.post_id);
                post_list.push(await postManager.getPost(comment.post_id));
            }
        }
    }

    // 3. render both
    for (const post of post_list) {
        insert_post(post, ".profile-user-posts")
    }
    
    for (const comment of comments_list) {
        (new commentViewManager(null)).insert_comment(comment, document.querySelector(`div[post-id="${comment.post_id}"]`))
    }
}

$(document).ready(async function() {
    const search_params = new URLSearchParams(window.location.search)
    target_user = search_params.get("user")

    $("#profile-overview-button").click(async function() {
        await render_profile(ProfileMode.MODE_OVERVIEW)
    })
    $("#profile-posts-button").click(async function() {
        await render_profile(ProfileMode.MODE_POSTS)
    })
    $("#profile-comments-button").click(async function() {
        await render_profile(ProfileMode.MODE_COMMENTS)
    })

    await render_profile(ProfileMode.MODE_OVERVIEW)
})
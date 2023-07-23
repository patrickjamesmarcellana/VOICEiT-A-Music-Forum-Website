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


async function render_profile(target_user, mode) {
    // note: .op is for post, .author is for comment (fix this)
    // note 2: post is a global variable containing all the posts for some reason
    // note 3: same for saved_comments

    // 0. wipe
    $(".profile-user-posts").html("")

    switch(mode) {
        case ProfileMode.MODE_OVERVIEW:
            setInfiniteScrollHandler(
                async(num_posts) => {
                    return await userManager.getUserOverview(target_user, new URLSearchParams([["post_limit", num_posts]]))
                },
                async (last_sent_post, num_posts) => {
                    const queryParams = new URLSearchParams()
                    queryParams.append("last_sent_datetime", last_sent_post.date)
                    queryParams.append("last_sent_id", last_sent_post._id)
                    queryParams.append("last_sent_type", last_sent_post.type)
                    queryParams.append("post_limit", num_posts)
        
                    return await userManager.getUserOverview(target_user, queryParams)
                },
                async (reference) => { // here, the API only provides the id so we have to resolve it
                    let post, comment
                    switch(reference.type) {
                        case "post":
                            post = (await postManager.getPost(reference._id))
                            postViewManager.insert_post(post, ".profile-user-posts")
                            break
                        case "comment":
                            comment = await commentManager.getComment(reference._id)
                            post = await postManager.getPost(comment.post_id)
                            post.text = ""
                            const s = postViewManager.insert_post(post, ".profile-user-posts")
                            commentViewManager.insert_comment(comment, s.get(0))
                            break
                    }
                })
            break
        case ProfileMode.MODE_POSTS:
            setInfiniteScrollHandler(
                async(num_posts) => {
                    return await postManager.getUserPosts(target_user, new URLSearchParams([["post_limit", num_posts]]))
                },
                async (last_sent_post, num_posts) => {
                    const queryParams = new URLSearchParams()
                    queryParams.append("last_sent_datetime", last_sent_post.date.toJSON())
                    queryParams.append("last_sent_id", last_sent_post.post_id)
                    queryParams.append("post_limit", num_posts)
        
                    return await postManager.getUserPosts(target_user, queryParams)
                },
                async (post) => {
                    postViewManager.insert_post(post, ".profile-user-posts")
                })
            break
        case ProfileMode.MODE_COMMENTS:
            setInfiniteScrollHandler(
                async(num_posts) => {
                    return await commentManager.getUserComments(target_user, new URLSearchParams([["post_limit", num_posts]]))
                },
                async (last_sent_post, num_posts) => {
                    console.log(last_sent_post)
                    const queryParams = new URLSearchParams()
                    queryParams.append("last_sent_datetime", last_sent_post.date.toJSON())
                    queryParams.append("last_sent_id", last_sent_post.comment_id)
                    queryParams.append("post_limit", num_posts)
        
                    return await commentManager.getUserComments(target_user, queryParams)
                },
                async (comment) => {
                    let post = await postManager.getPost(comment.post_id)
                    post.text = ""
                    const s = postViewManager.insert_post(post, ".profile-user-posts")
                    commentViewManager.insert_comment(comment, s.get(0))
                })
            break
    }

}

$(document).ready(async function() {
    const search_params = new URLSearchParams(window.location.search)
    target_user = search_params.get("user")

    $("#profile-overview-button").click(async function() {
        await render_profile(target_user, ProfileMode.MODE_OVERVIEW)
    })
    $("#profile-posts-button").click(async function() {
        await render_profile(target_user, ProfileMode.MODE_POSTS)
    })
    $("#profile-comments-button").click(async function() {
        await render_profile(target_user, ProfileMode.MODE_COMMENTS)
    })

    await render_profile(target_user, ProfileMode.MODE_OVERVIEW)
})
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
    $(".profile-user-posts").remove()
    $(".post-panel").append($(`<div class="profile-user-posts"></div>`))
    const profile_user_posts = $(".profile-user-posts")

    const addCommentToProfile = async (comment) => {
        let post

        let last_displayed_post = $(".profile-user-posts > .post-container").last()
        console.log(last_displayed_post)
        if(last_displayed_post.attr("post-id") === comment.post_id) {
            post = last_displayed_post
        } else {
            post = await postManager.getPost(comment.post_id)
            post.text = ""
            last_displayed_post = postViewManager.insert_post(post, profile_user_posts)
            last_displayed_post.find(".post-body, .post-buttons").hide()
        }
        
        const insertedComment = commentViewManager.insert_comment(comment, last_displayed_post.get(0))
        let comment_to_load
        if(comment.parent_comment_id != null) {
            comment_to_load = comment.parent_comment_id
        } else {
            comment_to_load = comment.comment_id
        }
        insertedComment.addEventListener("click", () => {
            // do not go if we pressed <a> or <button> or <textarea> or an element declared with suffix -button 
            if(!(["a", "button", "textarea"].includes(exact_element_pressed.tagName.toLowerCase()) ||
                 [...exact_element_pressed.classList].some(class_name => class_name.endsWith("-button")))) {
                
                window.location.href = "post.html?post=" + comment.post_id + "&comment_id=" + comment_to_load;
            }
        })

    }
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
                            postViewManager.insert_post(post, profile_user_posts)
                            break
                        case "comment":
                            comment = await commentManager.getComment(reference._id)
                            addCommentToProfile(comment)
                            break
                    }
                },
                async () => (await postManager.getUserPostCount(target_user) + await commentManager.getUserCommentCount(target_user)))
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
                    postViewManager.insert_post(post, profile_user_posts)
                },
                async () => (await postManager.getUserPostCount(target_user)))
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
                    addCommentToProfile(comment)
                },
                async () => (await commentManager.getUserCommentCount(target_user)))
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
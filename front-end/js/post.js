// TODO: move to template because theres a small delay between page load and post content load
$(document).ready(async function() {
    const LOGIN_USER = Cookies.get("logged_in_as")
    const search_params = new URLSearchParams(window.location.search)
    post_id = search_params.get("post")
    
    if(post_id !== null) {
        post = await postManager.getPost(post_id)
        const postOpResponse = await fetch("api/users/" + post.op);
        const postOp = await postOpResponse.json();

        $(".post-container").attr("post-id", post_id)
        $(".post-subforum").attr("href", "index.html?forum=" + post.subforum)
        $(".post-subforum").text("v/" + post.subforum)
        $(".post-profile").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").text(post.op)
        $(".post-profile-photo").attr("src", postOp.photoUrl);
        $(".post-title").text(post.title)
        $(".post-body").html(post.text)
        $(".upvote-count").text(post.upvote_count)
        $(".downvote-count").text(post.downvote_count)
        $(".comment-count").text(post.comment_count)
        $(".view-count").text(post.views)
        $(".post-date").html(`${post.date.toDateString('en-CA')} | ${post.date.toLocaleTimeString()}`)
    
        if(is_logged_in() && post.op === LOGIN_USER) {
            $(".post-options-button").css("display", "inline-block")
        } else {
            $(".post-options-button").css("display", "none")
        }
        
        // add votes
        $(".post-container").attr("upvote-count", post.upvote_count)
        $(".post-container").attr("downvote-count", post.downvote_count)
        updateVoteUI($(".post-container").get(0) /* convert to vanilla DOM */, post.vote_state, [post.upvote_count, post.downvote_count])

        // add vote listeners
        $(".post-container").find(".post-upvote-button").click(onPostVoteButtonPressed)
        $(".post-container").find(".post-downvote-button").click(onPostVoteButtonPressed)

        $(".post-text-editor-submit-button").click(async () => {
            const post_id = $(".post-container").attr("post-id")
            const [status, new_comment_id] = await commentManager.createComment(post_id, null, $(".post-text-editor > textarea").val())
            if(status == 200) {
                commentViewManager.insert_comment(await commentManager.getComment(new_comment_id), document.querySelector("#comments-panel"))
            }

            // reset text editor
            $(".post-text-editor").val("")
        })
        // render comments
        loadAllComment(post.top_level_comments_list)
    } 
})

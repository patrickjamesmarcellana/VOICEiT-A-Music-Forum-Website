// TODO: move to template because theres a small delay between page load and post content load
$(document).ready(async function() {
    const LOGIN_USER = Cookies.get("logged_in_as")
    const search_params = new URLSearchParams(window.location.search)
    post_id = search_params.get("post")
    
    if(post_id !== null) {
        post = await postManager.getPost(post_id)
        $(".post-container").attr("post-id", post_id)
        $(".post-subforum").attr("href", "index.html?forum=" + post.subforum)
        $(".post-subforum").text("v/" + post.subforum)
        $(".post-profile").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").text(post.op)
        $(".post-profile-photo").attr("src", `images/${post.op}.jpg`)
        $(".post-title").text(post.title)
        $(".post-body").html(post.text)
        $(".upvote-count").text(post.upvote_count)
        $(".downvote-count").text(post.downvote_count)
        $(".comment-count").text(post.comment_count)
        $(".post-date").html(`${post.date.toDateString('en-CA')} | ${post.date.toLocaleTimeString()}`)
    
        if(is_logged_in() && post.op === LOGIN_USER) {
            $(".post-options-button").css("display", "inline-block")
        } else {
            $(".post-options-button").css("display", "none")
        }
        
    
        // render comments
        loadAllComment(post.top_level_comments_list)
    } 
})

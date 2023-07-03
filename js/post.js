$(document).ready(async function() {
    const LOGIN_USER = "melissa_spellman"
    const search_params = new URLSearchParams(window.location.search)
    const post_id = search_params.get("post")
    
    if(post_id !== null) {
        const response = await fetch("api/posts/id/" + post_id)
        const post = (await response.json())[0]
        $(".post-container").attr("post-id", post_id)
        $(".post-subforum").attr("href", "index.html?forum=" + post.subforum)
        $(".post-subforum").text("v/" + post.subforum)
        $(".post-profile").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").attr("href", "profile.html?user=" + post.op)
        $(".post-profile-text").text(post.op)
        $(".post-profile-photo").attr("src", `images/${post.op}.jpg`)
        $(".post-title").text(post.title)
        $(".post-body").html(post.text)
        $(".comment-count").text(post.comment_count)
        $(".post-date").html(`${new Date(post.date).toDateString('en-CA')} | ${new Date(post.date).toLocaleTimeString()}`)
    
        if(is_logged_in() && post.op === LOGIN_USER) {
            $(".post-options-button").css("display", "inline-block")
        } else {
            $(".post-options-button").css("display", "none")
        }
        
    
        // render comments
        await loadAllComment(post.top_level_comments_list)
    } 
})

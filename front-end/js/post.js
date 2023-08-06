import is_logged_in from "./auth.js"
import Cookies from "./js.cookie-3.0.5.min.mjs"
import userManager from "./model/user-manager.js"
import commentPanel from "./comments.js"
import voteLogic from "./vote_logic.js"
import postManager from "./model/post-manager.js"
import commentManager from "./model/comment-manager.js"
import commentViewManager from "./view/comment-view.js"

// TODO: move to template because theres a small delay between page load and post content load
$(document).ready(async function() {
    const LOGIN_USER = Cookies.get("logged_in_as")
    const search_params = new URLSearchParams(window.location.search)
    const post_id = search_params.get("post")

    const date_options = {year: 'numeric', month: 'short', day: 'numeric'}
    const time_options = {hour: 'numeric', minute: '2-digit'}
    
    if(post_id !== null) {
        const response = await fetch("api/posts/id/" + post_id)

        // if post does not exist or was deleted yet the user was able to
        // access its old URL, just redirect the user
        if (response.status == 404) {
            console.log("Post not found, redirecting to index");
            window.location.replace("index.html?forum=home");
        }

        const post = (await response.json())[0]

        post.date = new Date(post.date)
        const postOp = await userManager.getUser(post.op);

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
        if(post.isEdited) {
            $(".post-edited").removeClass("hidden")
            $(".post-date").html(`${new Date(post.updateDate).toLocaleDateString('en-US', date_options)} | ${new Date(post.updateDate).toLocaleTimeString('en-US', time_options)}`)
        } else {
            $(".post-date").html(`${new Date(post.date).toLocaleDateString('en-US', date_options)} | ${new Date(post.date).toLocaleTimeString('en-US', time_options)}`)
        }
    
        if(is_logged_in() && post.op === LOGIN_USER) {
            $(".post-options-button").css("display", "inline-block")
        } else {
            $(".post-options-button").css("display", "none")
        }

        // delete button listener
        $(".delete-post-button").click(async () => {
            const status = await postManager.deletePost(post_id);
                if(status == 200) {
                    window.location.replace("index.html?forum=home")
                }
        })
        
        // add votes
        $(".post-container").attr("upvote-count", post.upvote_count)
        $(".post-container").attr("downvote-count", post.downvote_count)
        voteLogic.updateVoteUI($(".post-container").get(0) /* convert to vanilla DOM */, post.vote_state, [post.upvote_count, post.downvote_count])

        // add vote listeners
        $(".post-container").find(".post-upvote-button").click(voteLogic.onPostVoteButtonPressed)
        $(".post-container").find(".post-downvote-button").click(voteLogic.onPostVoteButtonPressed)

        $(".post-text-editor-submit-button").click(async () => {
            const post_id = $(".post-container").attr("post-id")
            const [status, new_comment_id] = await commentManager.createComment(post_id, null, $(".post-text-editor > textarea").val())
            if(status == 200) {
                commentViewManager.insert_comment(await commentManager.getComment(new_comment_id), document.querySelector("#comments-panel"))
                $(".comment-count").text(parseInt($(".comment-count").text()) + 1)
            }

            // reset text editor
            $(".post-text-editor > textarea").val("")
        })
        // render comments
        const specific_comment_id = search_params.get("comment_id")
        if(specific_comment_id) {
            commentPanel.comment_view_stack.push(post.top_level_comments_list) // push the "previous" view
            await commentPanel.loadSingleComment(specific_comment_id)
        } else {
            await commentPanel.loadAllComment(post.top_level_comments_list)
        }
    } 
})

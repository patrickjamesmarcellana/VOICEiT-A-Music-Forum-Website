import commentManager from "./model/comment-manager.js"
import postManager from "./model/post-manager.js"
import commentViewManager from "./view/comment-view.js"

const commentPanel = {
    // LIFO stack that stores the currently viewing comments by depth
    // to allow browsing very deep subcomments
    comment_view_stack: [],

    loadSingleComment: async function(comment_id) {
        // wipe comments?
        document.querySelector("#comments-panel").innerHTML = ""
    
        // set indicator
        document.querySelector(".comment-viewing-single-thread-indicator").classList.remove("hidden")
        document.querySelector(".comment-viewing-single-thread-indicator").addEventListener("click", commentPanel.comment_panel_back)
    
        await commentPanel.loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)
    
        commentPanel.comment_view_stack.push(comment_id)
    
        const search_params = new URLSearchParams(window.location.search)
        search_params.set("comment_id", comment_id)
        window.history.pushState({}, window.title, "?" + search_params.toString())
    },
    
    loadAllComment: async (top_level_comments_list) => {
        // wipe comments?
        document.querySelector("#comments-panel").innerHTML = ""
    
        // set indicator
        document.querySelector(".comment-viewing-single-thread-indicator").classList.add("hidden")
    
        for(const comment_id of top_level_comments_list) {
            await commentPanel.loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)
        }
    
        commentPanel.comment_view_stack.push(top_level_comments_list)
    
        const search_params = new URLSearchParams(window.location.search)
        if(search_params.has("comment_id")) {
            search_params.delete("comment_id")
            window.history.pushState({}, window.title, "?" + search_params.toString())
        }
    },
    
    // calls view
    // TODO: download all the comments in parallel (since we have the power of asynchronous js now)
    loadCommentTreeToView: async (comment_id, comment_panel, depth) => {
        const comment = await commentManager.getComment(comment_id)
        const comment_container = commentViewManager.insert_comment(comment, comment_panel)
    
        if(comment.subcomments.length > 0) {
            comment_container.enableSubcommentsPanel()
            if(depth < 4) {
                for(const subcomment_id of comment.subcomments) {
                    await commentPanel.loadCommentTreeToView(subcomment_id, comment_container.querySelector(":scope > .comment-subcomments-panel"), depth + 1)
                }
            } else { // depth limit exceeded?
                comment_container.showLoadMoreSubcommentsButton(comment.subcomments.length)
            }
        }
    },

    comment_panel_back: async () => {
        const current_comment = commentPanel.comment_view_stack.pop()
    
        if(commentPanel.comment_view_stack.length > 0) {
            await commentPanel.loadSingleComment(commentPanel.comment_view_stack.pop())
        } else {
            const post_id = document.querySelector(".post-container").getAttribute("post-id")
            const post = await postManager.getPost(post_id)
            await commentPanel.loadAllComment(post.top_level_comments_list)
        }
    
        // change anchor
        location.href = `${location.href.replace(/#.+/, "")}#comment-${current_comment}`
    }
}


export default commentPanel
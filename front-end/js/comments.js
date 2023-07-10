/*
shortcomings list:
1. dont hardcode user
2. change vote state type to an enum
*/


// LIFO stack that stores the currently viewing comments by depth
// to allow browsing very deep subcomments
const comment_view_stack = []

const loadSingleComment = async function(comment_id) {
    // wipe comments?
    document.querySelector("#comments-panel").innerHTML = ""

    // set indicator
    document.querySelector(".comment-subcomments-indicator").classList.remove("hidden")

    await loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)

    comment_view_stack.push(comment_id)

}

const loadAllComment = async (top_level_comments_list) => {
    // wipe comments?
    document.querySelector("#comments-panel").innerHTML = ""

    // set indicator
    document.querySelector(".comment-subcomments-indicator").classList.add("hidden")

    for(const comment_id of top_level_comments_list) {
        await loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)
    }
}


// calls view
// TODO: download all the comments in parallel (since we have the power of asynchronous js now)
const loadCommentTreeToView = async (comment_id, comment_panel, depth) => {
    const comment = await commentManager.getComment(comment_id)
    const comment_container = commentViewManager.insert_comment(comment, comment_panel)

    if(comment.subcomments.length > 0) {
        comment_container.enableSubcommentsPanel()
        if(depth < 4) {
            for(const subcomment_id of comment.subcomments) {
                await loadCommentTreeToView(subcomment_id, comment_container.querySelector(":scope > .comment-subcomments-panel"), depth + 1)
            }
        } else { // depth limit exceeded?
            comment_container.showLoadMoreSubcommentsButton(comment.subcomments.length)
        }
    }
}
const comment_panel_back = () => {
    const current_comment = comment_view_stack.pop()

    console.log(comment_view_stack)
    if(comment_view_stack.length > 0) {
        loadSingleComment(comment_view_stack.pop())
    } else {
        loadAllComment()
    }

    // change anchor
    location.href = `${location.href.replace(/#.+/, "")}#comment-${current_comment}`
}


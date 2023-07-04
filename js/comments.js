/*
shortcomings list:
1. dont hardcode user
2. change vote state type to an enum
*/
const LOGIN_USER = "melissa_spellman"

// LIFO stack that stores the currently viewing comments by depth
// to allow browsing very deep subcomments
const comment_view_stack = []

// store comments here for future use
const saved_comments = {}

// performs a DFS to count comments
const comment_count = (comments_list) => {
    if (comments_list.length == 0) {
        return 0;
    } else {
        let count = comments_list.length
        comments_list.forEach((x) => (count += comment_count(getComment(x).subcomments)))
        return count
    }
}
const dumpComment = (comment_info) => {
    saved_comments[comment_info.comment_id] = comment_info;
}

const getComment = (comment_id) => {
    return saved_comments[comment_id]
}

const loadSingleComment = function(comment_id) {
    // wipe comments?
    document.querySelector("#comments-panel").innerHTML = ""

    // set indicator
    document.querySelector(".comment-subcomments-indicator").classList.remove("hidden")

    loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)

    comment_view_stack.push(comment_id)

}

const loadAllComment = (top_level_comments_list) => {
    // wipe comments?
    document.querySelector("#comments-panel").innerHTML = ""

    // set indicator
    document.querySelector(".comment-subcomments-indicator").classList.add("hidden")

    top_level_comments_list.forEach(function(comment_id) {
        loadCommentTreeToView(comment_id, document.querySelector("#comments-panel"), 0)
    })
}


// calls view
const loadCommentTreeToView = (comment_id, comment_panel, depth) => {
    const comment = getComment(comment_id)
    const comment_container = (new commentViewManager(null)).insert_comment(comment, comment_panel)

    if(comment.subcomments.length > 0) {
        comment_container.enableSubcommentsPanel()
        if(depth < 4) {
            for(const subcomment_id of comment.subcomments) {
                loadCommentTreeToView(subcomment_id, comment_container.querySelector(":scope > .comment-subcomments-panel"), depth + 1)
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


/*
shortcomings list:
1. dont hardcode user
2. change vote state type to an enum
*/
// important note: querySelector only returns the first element (which is fine for comments that only have 1 of each element like comment body, upvote button, etc)


const LOGIN_USER = "melissa_spellman"

// LIFO stack that stores the currently viewing comments by depth
// to allow browsing very deep subcomments
const comment_view_stack = []

const COMMENT_PREFIX = "comment-"

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

    renderComment(getComment(comment_id), document.querySelector("#comments-panel"))

    comment_view_stack.push(comment_id)

}

const loadAllComment = (top_level_comments_list) => {
    // wipe comments?
    document.querySelector("#comments-panel").innerHTML = ""

    // set indicator
    document.querySelector(".comment-subcomments-indicator").classList.add("hidden")

    top_level_comments_list.forEach(function(x) {
        renderComment(getComment(x), document.querySelector("#comments-panel"))
    })
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

const renderComment = function(comment_info, commentInjectionLocation, depth=0, flags=[]){
    // only .container will be cloned because cloning the entire template breaks clicking (example: upvote button changes votes to NaN)
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#avoiding_documentfragment_pitfall
    const container = document.getElementById("comment-template").content.querySelector(".comment-container").cloneNode(/* deep copy */ true)
    console.log(depth, flags)

    if(comment_info == null) {
        console.warn(`Comment ${comment_id} not found. Aborting`)
        return
    }

    // comment prefix is important so we dont have to worry about posts and comments with the same id
    container.id = COMMENT_PREFIX + comment_info.comment_id
    container.setAttribute("backend_id", comment_info.comment_id)

    // store vote count on dict
    container.setAttribute("raw_vote_count", comment_info.votes)

    // inject comment author
    container.querySelector(".comment-author").textContent = comment_info.author
    container.querySelector(".comment-author").href = `profile.html?user=${comment_info.author}`

    // was the comment edited
    if(comment_info.flags.includes("edited")) {
        container.querySelector(".comment-edited-remark").classList.remove("hidden")
    }

    // inject comment text
    const lines = comment_info.content.split('\n')
    lines.forEach(function(line) {
        const paragraph = document.createElement("p")
        paragraph.textContent = line
        container.querySelector(".comment-content").appendChild(paragraph)
    })

    // inject listeners
    const vote_buttons = getVoteButtons(container)
    vote_buttons.upvote_button.addEventListener("click", onVoteButtonPressed)
    vote_buttons.downvote_button.addEventListener("click", onVoteButtonPressed)
    updateVoteUI(container, comment_info.vote_state, comment_info.votes)

    // should the edit/delete buttons be visible?
    if(is_logged_in() && comment_info.author === LOGIN_USER) {
        container.querySelector(".comment-edit-button").classList.remove("hidden")
        container.querySelector(".comment-edit-button").addEventListener("click", onEditButtonPressed)
        container.querySelector(".comment-delete-button").classList.remove("hidden")
    }
    container.querySelector(".comment-reply-button").addEventListener("click", onReplyButtonPressed)
    
    // mini text editor's buttons
    container.querySelector(".comment-text-editor-cancel-button").addEventListener("click", onCancelButtonPressed)

    // overwrite existing comment
    const old_comment = document.getElementById(container.id)
    if(old_comment === null) {
        if(commentInjectionLocation != null) {
            commentInjectionLocation.appendChild(container)
        }
    } else {
        old_comment.replaceWith(container)
    }

    // are the subcomments
    if(!flags.includes("dont-render-subcomments") && comment_info.subcomments.length > 0) {
        container.querySelector(".comment-subcomments-panel").classList.remove("hidden")
        container.classList.add("with-subcomments")

         // find children and render them
        if(depth < 4 /* depth limit */) {
            comment_info.subcomments.forEach(function(x) {
                renderComment(getComment(x), container.querySelector(".comment-subcomments-panel"), depth + 1, flags)
            })
        } else { // depth limit exceeded?
            const loadmore = container.querySelector(".comment-loadmore-button")
            loadmore.classList.remove("hidden")
            loadmore.textContent = loadmore.textContent.replace("$COUNT", comment_info.subcomments.length)
            loadmore.href = `javascript:loadSingleComment(${comment_info.comment_id})`
        }
    }
} 

const getIdFromDomId = (dom_id) => {
    return parseInt(dom_id.replace(`comment-`, ""))
}
const onEditButtonPressed = (event) => {
    const container = event.currentTarget.closest(".comment-container")
    const editor_container = container.querySelector(".comment-text-editor")
    editor_container.classList.remove("hidden")
    editor_container.querySelector("textarea").textContent = getComment(container.getAttribute("backend_id")).content
}

const onReplyButtonPressed = (event) => {
    const container = event.currentTarget.closest(".comment-container")
    const editor_container = container.querySelector(".comment-text-editor")

    if(is_logged_in()) {
        editor_container.classList.remove("hidden")

        // wipe text are to be sure
        editor_container.querySelector("textarea").textContent = ""
    } else {
        window.location.href = "login.html"
    }

}

const onCancelButtonPressed = (event) => {
    const container = event.currentTarget.closest(".comment-container")
    const editor_container = container.querySelector(".comment-text-editor")
    editor_container.classList.add("hidden")
}
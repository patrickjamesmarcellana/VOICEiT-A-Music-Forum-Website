// TODO: split onVoteButtonPressed between controller and view
// important note: querySelector only returns the first element (which is fine for comments that only have 1 of each element like comment body, upvote button, etc)
const COMMENT_PREFIX = "comment-"
const commentViewManager = {
    // Displays the comment
    // if the comment exists, it replaces the content

    // comment - comment object containing details
    // commentInjectionLocation - location to insert the comment into, ignored if the comment already exists
    // returns: container containing the displayed comment
    insert_comment: function(comment, commentInjectionLocation){
        if(comment == null) {
            console.warn(`Comment ${comment_id} not found. Aborting`)
            return
        }

        // overwrite existing comment?
        const container_id = COMMENT_PREFIX + comment.comment_id
        const old_comment = document.getElementById(container_id)
        let container = undefined
        if(old_comment === null) {
            // only .container will be cloned because cloning the entire template breaks clicking (example: upvote button changes votes to NaN)
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#avoiding_documentfragment_pitfall
            container = document.getElementById("comment-template").content.querySelector(".comment-container").cloneNode(/* deep copy */ true)
            if(commentInjectionLocation != null) {
                commentInjectionLocation.appendChild(container)
            }
        } else {
            container = old_comment
        }
        
        // comment prefix is important so we dont have to worry about posts and comments with the same id
        container.id = container_id
        container.setAttribute("backend_id", comment.comment_id)

        // store vote count on dict
        container.setAttribute("raw_vote_count", comment.votes)

        // inject comment author
        container.querySelector(".comment-author").textContent = comment.author
        container.querySelector(".comment-author").href = `profile.html?user=${comment.author}`

        // was the comment edited
        if(comment.flags.includes("edited")) {
            container.querySelector(".comment-edited-remark").classList.remove("hidden")
        }

        // inject comment text
        const lines = comment.content.split('\n')
        lines.forEach(function(line) {
            const paragraph = document.createElement("p")
            paragraph.textContent = line
            container.querySelector(".comment-content").appendChild(paragraph)
        })

        // inject listeners
        const vote_buttons = getVoteButtons(container)
        vote_buttons.upvote_button.addEventListener("click", onVoteButtonPressed)
        vote_buttons.downvote_button.addEventListener("click", onVoteButtonPressed)
        updateVoteUI(container, comment.vote_state, comment.votes)

        // should the edit/delete buttons be visible?
        if(is_logged_in() && comment.author === Cookies.get("logged_in_as")) {
            container.querySelector(".comment-edit-button").classList.remove("hidden")
            container.querySelector(".comment-edit-button").addEventListener("click", (event) => {
                const container = event.currentTarget.closest(".comment-container")
                const editor_container = container.querySelector(".comment-text-editor")
                editor_container.classList.remove("hidden")
                editor_container.querySelector("textarea").textContent = comment.content

                // set mode and listener
                editor_container.setAttribute("mode", "edit")
                editor_container.querySelector(".comment-text-editor-submit-button").addEventListener("click", commentViewManager.onMiniSubmitButtonPressed)
            })
            container.querySelector(".comment-delete-button").classList.remove("hidden")
        }

        // listeners
        const onReplyButtonPressed = (event) => {
            const container = event.currentTarget.closest(".comment-container")
            const editor_container = container.querySelector(".comment-text-editor")
    
            if(is_logged_in()) {
                editor_container.classList.remove("hidden")
    
                // wipe text are to be sure
                editor_container.querySelector("textarea").textContent = ""

                // set mode and listener
                editor_container.setAttribute("mode", "reply")
                editor_container.querySelector(".comment-text-editor-submit-button").addEventListener("click", commentViewManager.onMiniSubmitButtonPressed)
            } else {
                window.location.href = "login.html"
            }
    
        }
    
        const onCancelButtonPressed = (event) => {
            const container = event.currentTarget.closest(".comment-container")
            const editor_container = container.querySelector(".comment-text-editor")
            editor_container.classList.add("hidden")
        }

        container.querySelector(".comment-reply-button").addEventListener("click", onReplyButtonPressed)
        
        // mini text editor's buttons
        container.querySelector(".comment-text-editor-cancel-button").addEventListener("click", onCancelButtonPressed)

        // attach custom functions
        container.enableSubcommentsPanel = function() {
            this.querySelector(":scope > .comment-subcomments-panel").classList.remove("hidden")
            this.classList.add("with-subcomments")
        }

        container.showLoadMoreSubcommentsButton = function(subcomment_amount) {
            const loadmore = this.querySelector(":scope > .comment-subcomments-panel > .comment-loadmore-button")
        
            const comment_id = this.getAttribute("comment-id")
            loadmore.classList.remove("hidden")
            loadmore.textContent = loadmore.textContent.replace("$COUNT", subcomment_amount)
            loadmore.href = `javascript:loadSingleComment(${comment_id})`
        }

        return container
    },

    // add listners
    onMiniSubmitButtonPressed: async (event) => {
        const comment_id = event.currentTarget.closest(".comment-container").getAttribute("backend_id")
        const editor_container = event.currentTarget.closest(".comment-text-editor")
        const mode = editor_container.getAttribute("mode")
        console.log(comment_id, mode)

        
        const text_content = editor_container.querySelector("textarea").value
        let status = null

        switch(mode) {
            case "edit":
                status = await commentManager.editComment(comment_id, text_content)
                break
            case "reply":
                const post_id = event.currentTarget.closest(".post-container").getAttribute("post-id")
                status = await commentManager.createComment(post_id, comment_id, text_content)
                break
            default:
                console.log("Unknown action")
        }

        if(status == 200) {
            commentViewManager.insert_comment(commentManager.getComment(comment_id))
        }
    },

    onDeleteButtonPressed: async (event) => {
        const comment_id = event.currentTarget.closest(".comment-container").getAttribute("backend_id")

        const status = commentManager.deleteComment(comment_id)
        if(status == 200) {
            event.currentTarget.closest(".comment-container").remove()
        }
    }
}


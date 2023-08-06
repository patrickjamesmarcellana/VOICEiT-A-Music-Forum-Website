import Cookies from "../js.cookie-3.0.5.min.mjs"
import commentPanel from "../comments.js"
import commentManager from "../model/comment-manager.js"
import voteLogic from "../vote_logic.js"
import is_logged_in from "../auth.js"

// TODO: split onVoteButtonPressed between controller and view
// important note: querySelector only returns the first element (which is fine for comments that only have 1 of each element like comment body, upvote button, etc)
const COMMENT_PREFIX = "comment-"
const commentViewManager = {
    // Displays the comment
    // if the comment exists, it replaces the content

    // comment - comment object containing details
    // commentInjectionLocation - location to insert the comment into, ignored if the comment already exists
    // container - option to use a pre-existing container
    // returns: container containing the displayed comment
    insert_comment: function(comment, commentInjectionLocation, container){
        // overwrite existing comment?
        const container_id = COMMENT_PREFIX + comment.comment_id
        
        if(container == null) {
            // only .container will be cloned because cloning the entire template breaks clicking (example: upvote button changes votes to NaN)
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#avoiding_documentfragment_pitfall
            container = document.getElementById("comment-template").content.querySelector(".comment-container").cloneNode(/* deep copy */ true)

            if(commentInjectionLocation != null) {
                commentInjectionLocation.appendChild(container)
            }
        }

        const is_deleted = (comment.author == null)
        
        // comment prefix is important so we dont have to worry about posts and comments with the same id
        container.classList.add(container_id)

        if(!document.getElementById(container_id))
            container.id = container_id
        
        container.setAttribute("backend_id", comment.comment_id)

        // store vote count on dict
        container.setAttribute("raw_vote_count", comment.votes)

        // was the comment edited
        if(comment.flags.includes("edited")) {
            container.querySelector(".comment-edited-remark").classList.remove("hidden")
        }
        
        // inject comment author
        if(!is_deleted) {
            container.querySelector(".comment-author").textContent = comment.author
            container.querySelector(".comment-author").href = `profile.html?user=${comment.author}`
        } else {
            container.querySelector(".comment-author").textContent = "[deleted]"
            container.querySelector(".comment-author").removeAttribute("href")
            container.querySelector(".comment-edited-remark").classList.add("hidden")
        }

        // inject comment text
        const lines = comment.content.split('\n')
        container.querySelector(".comment-content").innerHTML = ""
        lines.forEach(function(line) {
            const paragraph = document.createElement("p")
            paragraph.textContent = line
            container.querySelector(".comment-content").appendChild(paragraph)
        })

        // inject date
        const date_options = {year: 'numeric', month: 'short', day: 'numeric'}
        const time_options = {hour: 'numeric', minute: '2-digit'}
        if(!is_deleted) {
            container.querySelector(".comment-date").textContent = `${new Date(comment.date).toLocaleDateString('en-US', date_options)} | ${new Date(comment.date).toLocaleTimeString('en-US', time_options)}`
        } else {
            // remove dot
            container.querySelector(".comment-header").innerHTML = container.querySelector(".comment-header").innerHTML.replace("•", "")
            container.querySelector(".comment-date").textContent = ""
        }
        

        // inject listeners
        const vote_buttons = voteLogic.getVoteButtons(container)
        if(!is_deleted) {
            vote_buttons.upvote_button.addEventListener("click", voteLogic.onCommentVoteButtonPressed)
            vote_buttons.downvote_button.addEventListener("click", voteLogic.onCommentVoteButtonPressed)
        } else {
            // vote_buttons.upvote_button.style["pointer-events"] = "none"
            // vote_buttons.downvote_button.style["pointer-events"] = "none"
            vote_buttons.upvote_button.classList.add("hidden")
            vote_buttons.downvote_button.classList.add("hidden")
            container.querySelector(".comment-vote-count").classList.add("hidden")
        }
        voteLogic.updateVoteUI(container, comment.vote_state, comment.votes)

        const prepareMiniTextEditor = (container, value) => {
            const editor_container = container.querySelector(".comment-text-editor")
            editor_container.classList.remove("hidden")
            editor_container.querySelector("textarea").value = value

            // set listeners
            editor_container.querySelector(".comment-text-editor-submit-button").addEventListener("click", commentViewManager.onMiniSubmitButtonPressed)
            editor_container.querySelector("textarea").addEventListener("keyup", (event) => {
                validateInput(editor_container)
            })

            // run at start
            validateInput(editor_container)

            return editor_container
        }
        const onEditButtonPressed = (event) => {
            const container = event.currentTarget.closest(".comment-container")
            const editor_container = prepareMiniTextEditor(container, comment.content)
            editor_container.setAttribute("mode", "edit")
        }

        const onReplyButtonPressed = (event) => {
            const container = event.currentTarget.closest(".comment-container")
    
            if(is_logged_in()) {
                const editor_container = prepareMiniTextEditor(container, "")
                editor_container.setAttribute("mode", "reply")
            } else {
                window.location.href = "login.html"
            }
        }

        // should the edit/delete buttons be visible?
        if(is_logged_in() && comment.author === Cookies.get("logged_in_as")) {
            container.querySelector(".comment-edit-button").classList.remove("hidden")
            container.querySelector(".comment-edit-button").addEventListener("click", onEditButtonPressed)
            container.querySelector(".confirm-comment-deletion-button").addEventListener("click", commentViewManager.onDeleteButtonPressed)
            container.querySelector(".cancel-comment-deletion-button").addEventListener("click", commentViewManager.hideDeleteCommentConfirmation)
            container.querySelector(".comment-delete-button").addEventListener("click", commentViewManager.showDeleteCommentConfirmation)
            container.querySelector(".comment-delete-button").classList.remove("hidden")
        } else {
            container.querySelector(".comment-edit-button").classList.add("hidden")
            container.querySelector(".comment-delete-button").classList.add("hidden")
        }
    
        const onCancelButtonPressed = (event) => {
            const container = event.currentTarget.closest(".comment-container")
            const editor_container = container.querySelector(".comment-text-editor")
            editor_container.classList.add("hidden")
        }

        // input validator
        const validateInput = (editor_container) => {
            const mini_text_editor = editor_container.querySelector("textarea")
            const submit_button = editor_container.querySelector(".comment-text-editor-submit-button")

            if(mini_text_editor.value.trim() !== "") {
                submit_button.disabled = false
            } else {
                submit_button.disabled = true
            }
        }
        
        if(!is_deleted) {
            // reply button
            container.querySelector(".comment-reply-button").addEventListener("click", onReplyButtonPressed)
        
            // mini text editor's buttons
            container.querySelector(".comment-text-editor-cancel-button").addEventListener("click", onCancelButtonPressed)
        } else {
            // hide reply for deleted comment
            container.querySelector(".comment-reply-button").classList.add("hidden")
        }

        // attach custom functions
        container.getSubcommentsPanel = function() {
            return this.querySelector(":scope > .comment-subcomments-panel")
        }

        container.enableSubcommentsPanel = function() {
            this.getSubcommentsPanel().classList.remove("hidden")
            this.classList.add("with-subcomments")
        }

        container.showLoadMoreSubcommentsButton = function(subcomment_amount) {
            const loadmore = this.querySelector(":scope > .comment-subcomments-panel > .comment-loadmore-button")
        
            const comment_id = this.getAttribute("backend_id")
            loadmore.classList.remove("hidden")
            loadmore.textContent = loadmore.textContent.replace("$COUNT", subcomment_amount)
            loadmore.addEventListener("click", () => {commentPanel.loadSingleComment(comment_id)})
        }

        return container
    },

    // add listners
    onMiniSubmitButtonPressed: async (event) => {
        const comment_container = event.currentTarget.closest(".comment-container")
        const editor_container = event.currentTarget.closest(".comment-text-editor")

        const comment_id = comment_container.getAttribute("backend_id")
        const mode = editor_container.getAttribute("mode")
        console.log(comment_id, mode)

        
        const text_content = editor_container.querySelector("textarea").value

        switch(mode) {
            case "edit":
            {
                const status = await commentManager.editComment(comment_id, text_content)
                if(status == 200) {
                    commentViewManager.insert_comment(await commentManager.getComment(comment_id), null, comment_container)
                }
                break
            }
            case "reply":
            { // need to block scope status
                const post_id = event.currentTarget.closest(".post-container").getAttribute("post-id")
                const [status, new_comment_id] = await commentManager.createComment(post_id, comment_id, text_content)
                if(status == 200) {
                    console.log(status, new_comment_id)
                    const commentCounter = comment_container.closest(".post-container").querySelector(".comment-count")
                    commentCounter.textContent = parseInt(commentCounter.textContent) + 1

                    // extra: the parent comment now has subcomments, enable if it has not been enabled
                    comment_container.enableSubcommentsPanel()

                    const reply = await commentManager.getComment(new_comment_id)
                    const insertedComment = commentViewManager.insert_comment(reply, comment_container.getSubcommentsPanel())
                    const viewDepth = commentViewManager.getViewDepth(insertedComment)
                    if(viewDepth >= 5) {
                        if(window.location.pathname.split("/").pop() !== "profile.html") {
                            await commentPanel.loadSingleComment(reply.parent_comment_id)
                        } else {
                            // we are in profile.html, loadSingleComment does not exist there
                            window.location.href = "/post.html?post=" + reply.post_id + "&comment_id=" + reply.parent_comment_id
                        }
                    }
                }
                break
            }

            default:
                console.log("Unknown action")
        }

        // hide the panel again
        editor_container.classList.add("hidden")
    },

    // show delete comment confirmation when user clicks on Delete
    showDeleteCommentConfirmation: (event) => {
        const container = event.currentTarget.closest(".comment-container")
        const comment_footer = container.querySelector(".comment-footer")
        const comment_delete_button = comment_footer.querySelector(".comment-delete-button")
        comment_delete_button.classList.add("hidden")
        const comment_delete_confirmation = comment_footer.querySelector(".comment-delete-confirmation")
        comment_delete_confirmation.classList.remove("hidden")
    },

    // hide confirmation when user cancels comment deletion
    hideDeleteCommentConfirmation: (event) => {
        const container = event.currentTarget.closest(".comment-container")
        const comment_footer = container.querySelector(".comment-footer")
        const comment_delete_confirmation = comment_footer.querySelector(".comment-delete-confirmation")
        comment_delete_confirmation.classList.add("hidden")
        const comment_delete_button = comment_footer.querySelector(".comment-delete-button")
        comment_delete_button.classList.remove("hidden")
    },

    onDeleteButtonPressed: async (event) => {
        const container = event.currentTarget.closest(".comment-container")
        const comment_footer = container.querySelector(".comment-footer")
        const comment_delete_confirmation = comment_footer.querySelector(".comment-delete-confirmation")
        comment_delete_confirmation.classList.add("hidden")
        const comment_delete_button = comment_footer.querySelector(".comment-delete-button")
        comment_delete_button.classList.remove("hidden")
        
        const comment_id = event.currentTarget.closest(".comment-container").getAttribute("backend_id")
        const status = await commentManager.deleteComment(comment_id)
        if(status == 200) {
            commentViewManager.insert_comment(await commentManager.getComment(comment_id), null, container)

            const commentCounter = container.closest(".post-container").querySelector(".comment-count")
            commentCounter.textContent = parseInt(commentCounter.textContent) - 1
        }
    },

    getViewDepth: (commentElement) => {
        let depth = 0

        let element = commentElement
        while(element.parentElement) {
            element = element.parentElement

            if(element.classList.contains("comment-container")) {
                depth++
            }
        }

        return depth
    }
}

export default commentViewManager
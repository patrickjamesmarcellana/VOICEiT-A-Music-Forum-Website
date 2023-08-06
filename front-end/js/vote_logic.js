import is_logged_in from "./auth.js"
import voteManager from "./model/vote-manager.js"

const voteLogic = {
    STATE_NOT_VOTED: 0,
    STATE_UPVOTED: 1,
    STATE_DOWNVOTED: 2,
    STATE_INVALID: 3,

    // for convinience
    getVoteButtons: (container) => {
        let button_class_prefix
        if(container.classList.contains("comment-container"))
            button_class_prefix = "comment-"
        else if(container.classList.contains("post-container"))
            button_class_prefix = "post-"
        
        return {
            upvote_button: container.querySelector(`.${button_class_prefix}upvote-button`),
            downvote_button: container.querySelector(`.${button_class_prefix}downvote-button`),
            getState: function() {
                let state = this.downvote_button.classList.contains("toggled") << 1 | this.upvote_button.classList.contains("toggled")
                if(state == voteLogic.STATE_INVALID)
                    state = voteLogic.STATE_NOT_VOTED;
                
                return state
            } 
        }},

    updateVoteUI: (container, new_state, vote_count) => {
        const vote_buttons = voteLogic.getVoteButtons(container)

        switch(new_state) {
            case voteLogic.STATE_NOT_VOTED:
                vote_buttons.upvote_button.classList.remove("toggled")
                vote_buttons.downvote_button.classList.remove("toggled")
                break;
            case voteLogic.STATE_UPVOTED:
                vote_buttons.upvote_button.classList.add("toggled")
                vote_buttons.downvote_button.classList.remove("toggled")
                break;
            case voteLogic.STATE_DOWNVOTED:
                vote_buttons.upvote_button.classList.remove("toggled")
                vote_buttons.downvote_button.classList.add("toggled")
                break;
        }
        
        if(container.classList.contains("comment-container")) {
            container.querySelector(".comment-vote-count").textContent = vote_count
        } else if(container.classList.contains("post-container")) {
            container.querySelector(".upvote-count").textContent = vote_count[0]
            container.querySelector(".downvote-count").textContent = vote_count[1]
        }
            

    },

    // determines new vote state based on user's button presses
    onCommentVoteButtonPressed: (event) => {
        const container = event.currentTarget.closest(".comment-container")
        const vote_buttons = voteLogic.getVoteButtons(container)
        const prev_state = vote_buttons.getState()

        if(is_logged_in()) {
            // ensure that button is either an upvote or downvote button (it cannot be both at the same time and it cannot be neither)
            if(!(event.currentTarget.classList.contains("comment-upvote-button") ^ event.currentTarget.classList.contains("comment-downvote-button"))) {
                throw "Invalid button state"
            }

            // check whether the user pressed the upvote or the downvote button
            // due to the assertion above, we are 100% sure that if pressedUpvote is false, then it is automatically a downvote button press
            const pressedUpvote = event.currentTarget.classList.contains("comment-upvote-button")

            // horrible state machine
            let new_state, vote_delta
            switch(prev_state) {
                case voteLogic.STATE_NOT_VOTED:
                    // current state: post not upvoted
                    // transitions:
                    //   pressed upvote  : change to upvote
                    //   pressed downvote: change to downvote
                    new_state  = pressedUpvote ? voteLogic.STATE_UPVOTED : voteLogic.STATE_DOWNVOTED
                    vote_delta = pressedUpvote ? +1 : -1
                    break
                case voteLogic.STATE_UPVOTED:
                    new_state  = pressedUpvote ? voteLogic.STATE_NOT_VOTED : voteLogic.STATE_DOWNVOTED
                    vote_delta = pressedUpvote ? -1 : -2
                    break
                case voteLogic.STATE_DOWNVOTED:
                    new_state  = pressedUpvote ? voteLogic.STATE_UPVOTED : voteLogic.STATE_NOT_VOTED
                    vote_delta = pressedUpvote ? +2 : +1
                    break
            }
            
            const comment_id = container.getAttribute("backend_id") // get id of post to pass to API
            voteManager.voteComment(comment_id, new_state)

            const cur_votes = parseInt(container.getAttribute("raw_vote_count"))
            container.setAttribute("raw_vote_count", cur_votes + vote_delta)
            voteLogic.updateVoteUI(container, new_state, cur_votes + vote_delta)
        } else {
            window.location.href = "login.html"
        }
    },

    onPostVoteButtonPressed: async (event) => {
        const container = event.currentTarget.closest(".post-container")
        const vote_buttons = voteLogic.getVoteButtons(container)
        const prev_state = vote_buttons.getState()

        if(is_logged_in()) {
            // ensure that button is either an upvote or downvote button (it cannot be both at the same time and it cannot be neither)
            if(!(event.currentTarget.classList.contains("post-upvote-button") ^ event.currentTarget.classList.contains("post-downvote-button"))) {
                throw "Invalid button state"
            }

            // check whether the user pressed the upvote or the downvote button
            // due to the assertion above, we are 100% sure that if pressedUpvote is false, then it is automatically a downvote button press
            const pressedUpvote = event.currentTarget.classList.contains("post-upvote-button")

            let upvote_cnt = parseInt(container.getAttribute("upvote-count"))
            let downvote_cnt = parseInt(container.getAttribute("downvote-count"))
            let new_state
            switch(prev_state) {
                case voteLogic.STATE_NOT_VOTED:
                    new_state  = pressedUpvote ? voteLogic.STATE_UPVOTED : voteLogic.STATE_DOWNVOTED
                    if(pressedUpvote) {
                        upvote_cnt   += 1
                        downvote_cnt += 0
                    } else {
                        upvote_cnt   += 0
                        downvote_cnt += 1
                    }
                    break
                case voteLogic.STATE_UPVOTED:
                    new_state  = pressedUpvote ? voteLogic.STATE_NOT_VOTED : voteLogic.STATE_DOWNVOTED
                    if(pressedUpvote) {
                        upvote_cnt   -= 1
                        downvote_cnt += 0
                    } else {
                        upvote_cnt   -= 1
                        downvote_cnt += 1
                    }
                    break
                case voteLogic.STATE_DOWNVOTED:
                    new_state  = pressedUpvote ? voteLogic.STATE_UPVOTED : voteLogic.STATE_NOT_VOTED
                    if(pressedUpvote) {
                        upvote_cnt   += 1
                        downvote_cnt -= 1
                    } else {
                        upvote_cnt   += 0
                        downvote_cnt -= 1
                    }
                    break
            }

            const post_id = container.getAttribute("post-id") // get id of post to pass to API
            await voteManager.votePost(post_id, new_state)
            container.setAttribute("upvote-count", upvote_cnt)
            container.setAttribute("downvote-count", downvote_cnt)
            voteLogic.updateVoteUI(container, new_state, [upvote_cnt, downvote_cnt])
        } else {
            window.location.href = "login.html"
        }
    }
}

export default voteLogic
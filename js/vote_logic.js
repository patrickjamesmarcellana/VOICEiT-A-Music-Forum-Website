const STATE_NOT_VOTED = 0
const STATE_UPVOTED = 1
const STATE_DOWNVOTED = 2
const STATE_INVALID = 3

// for convinience
const getVoteButtons = (container) => ({
        upvote_button: container.querySelector(".comment-upvote-button"),
        downvote_button: container.querySelector(".comment-downvote-button"),
        getState: function() {
            const state = this.downvote_button.classList.contains("toggled") << 1 | this.upvote_button.classList.contains("toggled")
            if(state == STATE_INVALID)
                state = STATE_NOT_VOTED;
            
            return state
        } 
    })

const updateVoteUI = (container, new_state, vote_count) => {
    const vote_buttons = getVoteButtons(container)

    switch(new_state) {
        case STATE_NOT_VOTED:
            vote_buttons.upvote_button.classList.remove("toggled")
            vote_buttons.downvote_button.classList.remove("toggled")
            break;
        case STATE_UPVOTED:
            vote_buttons.upvote_button.classList.add("toggled")
            vote_buttons.downvote_button.classList.remove("toggled")
            break;
        case STATE_DOWNVOTED:
            vote_buttons.upvote_button.classList.remove("toggled")
            vote_buttons.downvote_button.classList.add("toggled")
            break;
    }
    
    container.querySelector(".comment-vote-count").textContent = vote_count
}

// determines new vote state based on user's button presses
const onVoteButtonPressed = (event) => {
    const container = event.currentTarget.closest(".comment-container")
    const vote_buttons = getVoteButtons(container)
    const prev_state = vote_buttons.getState()

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
        case STATE_NOT_VOTED:
            // current state: post not upvoted
            // transitions:
            //   pressed upvote  : change to upvote
            //   pressed downvote: change to downvote
            new_state  = pressedUpvote ? STATE_UPVOTED : STATE_DOWNVOTED
            vote_delta = pressedUpvote ? +1 : -1
            break
        case STATE_UPVOTED:
            new_state  = pressedUpvote ? STATE_NOT_VOTED : STATE_DOWNVOTED
            vote_delta = pressedUpvote ? -1 : -2
            break
        case STATE_DOWNVOTED:
            new_state  = pressedUpvote ? STATE_UPVOTED : STATE_NOT_VOTED
            vote_delta = pressedUpvote ? +2 : +1
            break
    }
    
    const post_id = container.id // get id of post to pass to API
    //changeVoteApi(post_id, newVote)

    const cur_votes = parseInt(container.getAttribute("raw_vote_count"))
    container.setAttribute("raw_vote_count", cur_votes + vote_delta)
    updateVoteUI(container, new_state, cur_votes + vote_delta)
} 

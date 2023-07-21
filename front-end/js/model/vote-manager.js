const voteManager = {
    voteComment: async function(comment_id, vote_state) {
        const response = await fetch(`/api/vote/comment/${comment_id}/${vote_state}`, {method: "POST"})
        return response.status
    }
} 

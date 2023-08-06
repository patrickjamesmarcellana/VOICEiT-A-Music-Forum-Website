const voteManager = {
    voteComment: async function(comment_id, vote_state) {
        const response = await fetch(`/api/vote/comment/${comment_id}/${vote_state}`, {method: "POST"})
        return response.status
    },

    votePost: async function(comment_id, vote_state) {
        const response = await fetch(`/api/vote/post/${comment_id}/${vote_state}`, {method: "POST"})
        return response.status
    }
} 

export default voteManager
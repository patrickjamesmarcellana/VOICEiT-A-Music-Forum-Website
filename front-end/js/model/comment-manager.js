const commentManager = {
    // store comments here for future use
    saved_comments: {},

    getComment: async function(comment_id) {
        const response = await fetch("api/comments/id/" + comment_id)
        return await response.json()
    },

    getUserComments: async function(user) {
        const response = await fetch("api/comments/user/" + user)
        const json = await response.json()
        return json
    }
}
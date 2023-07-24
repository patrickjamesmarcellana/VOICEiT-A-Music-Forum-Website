const commentManager = {
    // store comments here for future use
    saved_comments: {},

    getComment: async function(comment_id) {
        const response = await fetch("api/comments/id/" + comment_id)
        return await response.json()
    },

    getUserComments: async function(user, queryParams) {
        let queryString = ""
        if(queryParams != null) {
            queryString = "?" + queryParams.toString()
        }
        const response = await fetch("api/comments/user/" + user + queryString)
        const json = await response.json()

        json.forEach(post => post.date = post.date ? new Date(post.date) : null)
        return json
    },

    getUserCommentCount: async function(user) {
        const response = await fetch("api/comments/count/user/" + user)
        const json = await response.json()
        return json
    },

    createComment: async function(parent_post, parent_comment, comment_content) {
        const response = await fetch("/api/submit/create-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "comment-content": comment_content,
                "parent-post": parent_post,
                "parent-comment": parent_comment,
            })
        })

        const response_json = await response.json()
        const new_comment_id = response_json.comment_id

        return [response.status, new_comment_id]
    },

    editComment: async function(comment_id, comment_content) {
        const response = await fetch("/api/submit/edit-comment/" + comment_id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "comment-content": comment_content,
            })
        })

        return response.status
    },

    deleteComment: async function(comment_id) {
        const response = await fetch("/api/delete/comment/" + comment_id, {
            method: "DELETE",
        })

        return response.status
    }
}
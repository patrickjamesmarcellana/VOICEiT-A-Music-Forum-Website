const postManager = {
    getPost: async function(post_id) {
        const response = await fetch("api/posts/id/" + post_id)
        const post = (await response.json())[0]

        post.date = new Date(post.date)
        return post
    },

    getSubforumPosts: async function(post_id) {
        const response = await fetch("api/posts/subforum/" + post_id)
        const json = await response.json()

        json.forEach(post => post.date = new Date(post.date))
        return json
    },

    getUserPosts: async function(user) {
        const response = await fetch("api/posts/user/" + user)
        const json = await response.json()

        json.forEach(post => post.date = new Date(post.date))
        return json
    }
} 

const postManager = {
    getPost: async function(post_id) {
        const response = await fetch("api/posts/id/" + post_id)
        const post = (await response.json())[0]

        post.date = new Date(post.date)
        return post
    },

    getSubforumPosts: async function(subforum_id, queryParams) {
        let queryString = ""
        if(queryParams != null) {
            queryString = "?" + queryParams.toString()
        }
        const response = await fetch("api/posts/subforum/" + subforum_id + queryString)
        const json = await response.json()

        json.forEach(post => post.date = new Date(post.date))
        return json
    },

    getUserPosts: async function(user, queryParams) {
        let queryString = ""
        if(queryParams != null) {
            queryString = "?" + queryParams.toString()
        }
        const response = await fetch("api/posts/user/" + user + queryString)
        const json = await response.json()

        json.forEach(post => post.date = new Date(post.date))
        return json
    },

    getSearchPosts: async function(searchkey, queryParams) {
        let queryString = ""
        if(queryParams != null) {
            queryString = "?" + queryParams.toString()
        }
        const response = await fetch("api/posts/search/" + searchkey + queryString)
        const json = await response.json()

        json.forEach(post => post.date = new Date(post.date))
        return json
    }
} 

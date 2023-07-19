const userManager = {
    getUser: async function(user) {
        const response = await fetch("api/" + user)
        const json = await response.json()

        return json
    }
}
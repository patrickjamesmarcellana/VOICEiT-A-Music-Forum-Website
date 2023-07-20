const userManager = {
    getUser: async function(user) {
        const response = await fetch("/api/users/" + user)
        const json = await response.json()

        return json
    }
}
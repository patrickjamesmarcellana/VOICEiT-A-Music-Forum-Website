const userManager = {
    getUser: async function(user) {
        const response = await fetch("/api/users/" + user)
        const json = await response.json()

        return json
    },
    editProfile: async function(username, formData) {
        const response = await fetch("/api/submit/edit-profile", {
            method: "POST",
            body: formData
        })

        return response.status
    },
}
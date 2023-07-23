const userManager = {
    getUser: async function(user) {
        const response = await fetch("/api/users/" + user)
        const json = await response.json()

        return json
    },
    getUserOverview: async (user, queryParams) => { // what spez calls the user overview in his website
        let queryString = ""
        if(queryParams != null) {
            queryString = "?" + queryParams.toString()
        }
        const response = await fetch("api/users/" + user + "/combo" + queryString)
        const json = await response.json()
        return json
    },
    editProfile: async function(username, formData) {
        const response = await fetch("/api/submit/edit-profile", {
            method: "PATCH",
            body: formData
        })

        return response.status
    },
    editDescOnly: async function(username, description) {
        const response = await fetch("/api/submit/edit-description", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "description": description
            })
        })

        return response.status
    },
    setDefaultPhoto: async function() {
        const response = await fetch("/api/submit/set-default-photo", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response.status
    }
}
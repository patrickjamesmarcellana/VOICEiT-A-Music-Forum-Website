const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

$(".submit-form-button").click(async function (e) {
    e.preventDefault();
    
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: loginUsername.value,
            password: loginPassword.value,
        })
    })

    console.log(response.status)
    if(response.status == 200) {
        window.location.href = "index.html"
    } else {
        console.log("ERROR")
    }
});


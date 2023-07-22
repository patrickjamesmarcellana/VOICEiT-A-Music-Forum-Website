const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const submitFormBtn = document.getElementById("submit-button");
const stayLoggedIn = document.getElementById("stay-logged-in");

document.addEventListener("DOMContentLoaded", async (event) => {
    if (typeof Cookies === "undefined") {
        console.log("Downloading js-cookie");
        await $.getScript("/js/js.cookie-3.0.5.min.js");
    }

    if (is_logged_in()) {
        window.location.replace("index.html");
    }
});

submitFormBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: loginUsername.value,
            password: loginPassword.value,
            persist: stayLoggedIn.checked,
        }),
    });

    console.log(response.status);
    if (response.status == 200) {
        window.location.replace("index.html");
    } else {
        console.log("Login error");
    }
});

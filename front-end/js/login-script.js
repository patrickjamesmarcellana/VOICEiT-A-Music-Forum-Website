import is_logged_in from "./auth.js"

const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const submitFormBtn = document.getElementById("submit-button");
const stayLoggedIn = document.getElementById("stay-logged-in");

document.addEventListener("DOMContentLoaded", async (event) => {
    if (is_logged_in()) {
        window.location.replace("index.html");
    }
});

submitFormBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // user does not exist
    const userExistsResponse = await fetch("/api/users/" + loginUsername.value);
    if (userExistsResponse.status === 404) {
        loginUsername.style.border = "2px solid red";
        addNoUserExistsMessage();

        loginPassword.style.border = "";
        removeIncorrectPasswordMessage();

        return;
    }

    // try to login with supplied username and password
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
        // redirect once login is successful
        if ("referrer" in document) {
            window.location.replace(document.referrer);
        } else {
            window.location.replace("index.html");
        }
    } else {
        // inform user of incorrect credentials combination
        loginUsername.style.border = "";
        removeNoUserExistsMessage();

        loginPassword.style.border = "2px solid red";
        addIncorrectPasswordMessage();

        console.log("Login error");
    }
});

function addNoUserExistsMessage() {
    const noUser = document.createElement("div");
    noUser.className = "invalid-field-message";
    noUser.id = "no-username-exists-message";
    noUser.innerHTML = "User does not exist.";

    const noUserMessage = document.getElementById("no-username-exists-message");
    if (!noUserMessage) {
        loginUsername.parentElement.append(noUser);
    }
}

function removeNoUserExistsMessage() {
    document.getElementById("no-username-exists-message")?.remove();
}

function addIncorrectPasswordMessage() {
    const wrongPassword = document.createElement("div");
    wrongPassword.className = "invalid-field-message";
    wrongPassword.id = "incorrect-password-message";
    wrongPassword.innerHTML = "Entered password is incorrect.";

    const wrongPasswordMessage = document.getElementById(
        "incorrect-password-message"
    );
    if (!wrongPasswordMessage) {
        loginPassword.parentElement.append(wrongPassword);
    }
}

function removeIncorrectPasswordMessage() {
    document.getElementById("incorrect-password-message")?.remove();
}

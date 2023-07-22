const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const confirmLoginPassword = document.getElementById("confirm-login-password");
const createAccountBtn = document.getElementById("submit-button");
const customizeProfileBtn = document.querySelector(".next-button");

document.addEventListener("DOMContentLoaded", async (event) => {
    if (typeof Cookies === "undefined") {
        console.log("Downloading js-cookie");
        await $.getScript("/js/js.cookie-3.0.5.min.js");
    }

    if (is_logged_in()) {
        window.location.replace("index.html");
    }
});

loginUsername.addEventListener("keyup", (event) => {
    // if user tried registering with username and it already exists, remove
    // the error message as they type a new username
    removeUsernameExistsMessage();

    // if username is invalid, set text box border to red and display message
    // if one is not displayed already
    if (!isUsernameFormatValid()) {
        loginUsername.style.border = "2px solid red";
        addInvalidUsernameMessage();
        return;
    }

    // if username is valid, set text box border to default and remove invalid
    // message if there is any
    loginUsername.style.border = "";
    removeInvalidUsernameMessage();
});

loginPassword.addEventListener("keyup", (event) => {
    // update confirm password error message as well
    setMismatchedPasswordMessage();

    // if password is invalid, set text box border to red and display message
    // if one is not displayed already
    if (!isPasswordFormatValid()) {
        loginPassword.style.border = "2px solid red";
        addInvalidPasswordMessage();
        return;
    }

    // if password is valid, set text box border to default and remove invalid
    // message if there is any
    loginPassword.style.border = "";
    removeInvalidPasswordMessage();
});

confirmLoginPassword.addEventListener("keyup", (event) => {
    setMismatchedPasswordMessage();
});

createAccountBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    // if any field is invalid, don't do anything when button is clicked
    if (
        !isUsernameFormatValid() ||
        !isPasswordFormatValid() ||
        !arePasswordsMatching()
    ) {
        return;
    }

    try {
        // if all fields are valid, try to create account with given username
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value,
            }),
        });

        // automatically login to account after registering
        if (response.status === 200) {
            const loginResponse = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginUsername.value,
                    password: loginPassword.value,
                }),
            });

            // if successful, display account registration notification
            if (loginResponse.status === 200) {
                document.querySelector(".register-box").style.display = "none";
                document.querySelector(
                    ".notification-container"
                ).style.display = "block";
                document.querySelector(
                    ".notification-inner-container"
                ).style.display = "flex";
            } else {
                console.log("Login after register error");
            }
            return;
        }

        // username already exists in DB
        const responseText = await response.text();
        if (response.status === 401 && responseText === "Username exists") {
            loginUsername.style.border = "2px solid red";
            addUsernameExistsMessage();
            return;
        }

        // extra backend username validation
        if (
            response.status === 401 &&
            responseText === "Username format invalid"
        ) {
            loginUsername.style.border = "2px solid red";
            addInvalidUsernameMessage();
            return;
        }
    } catch (error) {
        console.error(error);
    }
});

customizeProfileBtn.addEventListener("click", (event) => {
    window.location.replace("profile.html?user=" + loginUsername.value);
});

function isUsernameFormatValid() {
    const validUsernameRegex = /^\w{3,20}$/;
    return loginUsername.value.match(validUsernameRegex);
}

function isPasswordFormatValid() {
    const validPasswordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,32}$/;
    return loginPassword.value.match(validPasswordRegex);
}

function arePasswordsMatching() {
    return loginPassword.value === confirmLoginPassword.value;
}

function addInvalidUsernameMessage() {
    const invalidUsername = document.createElement("div");
    invalidUsername.className = "invalid-field-message";
    invalidUsername.id = "invalid-username-message";
    invalidUsername.innerHTML =
        "Username must be between 3 - 20 characters only. It \
        can contain the following: uppercase, lowercase, numbers, and underscores.";

    const invalidUsernameMessage = document.getElementById(
        "invalid-username-message"
    );
    if (!invalidUsernameMessage) {
        loginUsername.parentElement.append(invalidUsername);
    }
}

function removeInvalidUsernameMessage() {
    document.getElementById("invalid-username-message")?.remove();
}

function addInvalidPasswordMessage() {
    const invalidPassword = document.createElement("div");
    invalidPassword.className = "invalid-field-message";
    invalidPassword.id = "invalid-password-message";
    invalidPassword.innerHTML =
        "Password must be between 8 - 32 characters long. It should \
        contain at least one of each: uppercase, lowercase, numbers, and symbols \
        (#?!@$%^&*-_.).";

    const invalidPasswordMessage = document.getElementById(
        "invalid-password-message"
    );
    if (!invalidPasswordMessage) {
        loginPassword.parentElement.append(invalidPassword);
    }
}

function removeInvalidPasswordMessage() {
    document.getElementById("invalid-password-message")?.remove();
}

function setMismatchedPasswordMessage() {
    // if entered password does not match, set text border to red and
    // display message if one is not displayed already
    if (!arePasswordsMatching()) {
        confirmLoginPassword.style.border = "2px solid red";
        addMismatchedPasswordMessage();
        return;
    }

    // if password matches, set text box border to default and remove
    // invalid message if there is any
    confirmLoginPassword.style.border = "";
    removeMismatchedPasswordMessage();
}

function addMismatchedPasswordMessage() {
    const mismatchedPassword = document.createElement("div");
    mismatchedPassword.className = "invalid-field-message";
    mismatchedPassword.id = "mismatched-confirm-password-message";
    mismatchedPassword.innerHTML = "Entered passwords do not match.";

    const mismatchedConfirmPasswordMessage = document.getElementById(
        "mismatched-confirm-password-message"
    );
    if (!mismatchedConfirmPasswordMessage) {
        confirmLoginPassword.parentElement.append(mismatchedPassword);
    }
}

function removeMismatchedPasswordMessage() {
    document.getElementById("mismatched-confirm-password-message")?.remove();
}

function addUsernameExistsMessage() {
    const usernameTaken = document.createElement("div");
    usernameTaken.className = "invalid-field-message";
    usernameTaken.id = "existing-username-message";
    usernameTaken.innerHTML = "Username is already taken!";

    const usernameTakenMessage = document.getElementById(
        "existing-username-message"
    );
    if (!usernameTakenMessage) {
        loginUsername.parentElement.append(usernameTaken);
    }
}

function removeUsernameExistsMessage() {
    document.getElementById("existing-username-message")?.remove();
}

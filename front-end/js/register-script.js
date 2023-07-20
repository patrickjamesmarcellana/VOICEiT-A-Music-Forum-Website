$(document).ready(function () {
    const loginUsername = document.getElementById("login-username");
    const loginPassword = document.getElementById("login-password");
    const confirmLoginPassword = document.getElementById(
        "confirm-login-password"
    );

    loginUsername.addEventListener("keyup", (event) => {
        const invalidUsername = document.createElement("div");
        invalidUsername.className = "invalid-field-message";
        invalidUsername.id = "invalid-username-message";
        invalidUsername.innerHTML =
            "Username must be between 3 - 20 characters only. It \
        can contain the following: uppercase, lowercase, numbers, and underscores.";

        const validUsernameRegex = /^\w{3,20}$/;

        // if username is invalid, set text box border to red and display message
        // if one is not displayed already
        if (!loginUsername.value.match(validUsernameRegex)) {
            loginUsername.style.border = "2px solid red";
            const invalidUsernameMessage = document.getElementById(
                "invalid-username-message"
            );
            if (!invalidUsernameMessage) {
                loginUsername.parentElement.append(invalidUsername);
            }
            return;
        }

        // if username is valid, set text box border to default and remove invalid
        // message if there is any
        loginUsername.style.border = "";
        const invalidUsernameMessage = document.getElementById(
            "invalid-username-message"
        );
        if (invalidUsernameMessage) {
            invalidUsernameMessage.remove();
        }
    });

    loginPassword.addEventListener("keyup", (event) => {
        const invalidPassword = document.createElement("div");
        invalidPassword.className = "invalid-field-message";
        invalidPassword.id = "invalid-password-message";
        invalidPassword.innerHTML =
            "Password must be between 8 - 32 characters long. It should \
            contain one of each: uppercase, lowercase, numbers, and symbols \
            (#?!@$%^&*-).";

        const validPasswordRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

        // if password is invalid, set text box border to red and display message
        // if one is not displayed already
        if (!loginPassword.value.match(validPasswordRegex)) {
            loginPassword.style.border = "2px solid red";
            const invalidPasswordMessage = document.getElementById(
                "invalid-password-message"
            );
            if (!invalidPasswordMessage) {
                loginPassword.parentElement.append(invalidPassword);
            }
            return;
        }

        // if password is valid, set text box border to default and remove invalid
        // message if there is any
        loginPassword.style.border = "";
        const invalidPasswordMessage = document.getElementById(
            "invalid-password-message"
        );
        if (invalidPasswordMessage) {
            invalidPasswordMessage.remove();
        }
    });

    confirmLoginPassword.addEventListener("keyup", (event) => {
        const mismatchedPassword = document.createElement("div");
        mismatchedPassword.className = "invalid-field-message";
        mismatchedPassword.id = "mismatched-confirm-password-message";
        mismatchedPassword.innerHTML = "Entered password does not match.";

        // if entered password does not match, set text border to red and
        // display message if one is not displayed already
        if (loginPassword.value !== confirmLoginPassword.value) {
            confirmLoginPassword.style.border = "2px solid red";
            const mismatchedConfirmPasswordMessage = document.getElementById(
                "mismatched-confirm-password-message"
            );
            if (!mismatchedConfirmPasswordMessage) {
                confirmLoginPassword.parentElement.append(mismatchedPassword);
            }
            return;
        }

        // if password matches, set text box border to default and remove
        // invalid message if there is any
        confirmLoginPassword.style.border = "";
        document
            .getElementById("mismatched-confirm-password-message")
            ?.remove();
    });
});
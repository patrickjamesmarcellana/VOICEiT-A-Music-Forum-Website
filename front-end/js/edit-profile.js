const modal = document.querySelector(".edit-profile-modal");
const exitModalBtn = document.querySelector(".exit-button");
const editProfileBtns = document.querySelectorAll(".edit-profile-button");
const removePictureBtn = document.querySelector("#remove-picture");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.querySelector("#profile-picture").value = "";
        document.querySelector("#description").value = "";
    }
};

exitModalBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
    document.querySelector("#profile-picture").value = "";
    document.querySelector("#description").value = "";
});

removePictureBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("/api/submit/edit-profile?_method=PATCH", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                removePhoto: "true",
            }),
        });

        if (response.status === 200) {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
});

for (const editProfileBtn of editProfileBtns) {
    editProfileBtn.addEventListener("click", async (event) => {
        const search_params = new URLSearchParams(window.location.search)
        user = await userManager.getUser(search_params.get("user"));
        document.querySelector("#description").value = user.description;
        modal.style.display = "block";
    });
}

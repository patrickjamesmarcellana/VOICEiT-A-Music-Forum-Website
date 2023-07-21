const modal = document.querySelector(".edit-profile-modal");
const exitModalBtn = document.querySelector(".exit-button");
const editProfileBtns = document.querySelectorAll(".edit-profile-button");

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

for (const editProfileBtn of editProfileBtns) {
    editProfileBtn.addEventListener("click", async (event) => {
        const search_params = new URLSearchParams(window.location.search)
        user = await userManager.getUser(search_params.get("user"));
        document.querySelector("#description").value = user.description;
        modal.style.display = "block";
    });
}

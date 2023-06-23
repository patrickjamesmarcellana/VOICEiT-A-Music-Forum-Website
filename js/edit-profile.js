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
    editProfileBtn.addEventListener("click", (event) => {
        modal.style.display = "block";
    });
}

const modal = document.querySelector(".edit-profile-modal");
const exitModalBtn = document.querySelector(".exit-button");
const editProfileBtns = document.querySelectorAll(".edit-profile-button");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

exitModalBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
});

for (const editProfileBtn of editProfileBtns) {
    editProfileBtn.addEventListener("click", (event) => {
        modal.style.display = "block";
    });
}

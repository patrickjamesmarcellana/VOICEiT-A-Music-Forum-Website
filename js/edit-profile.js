const modal = document.querySelector(".edit-profile-modal");
const editProfileBtn = document.querySelector(".edit-profile-button");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

editProfileBtn.addEventListener("click", (event) => {
    modal.style.display = "block";
});

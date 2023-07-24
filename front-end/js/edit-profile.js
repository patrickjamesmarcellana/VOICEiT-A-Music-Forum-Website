const modal = document.querySelector(".edit-profile-modal");
const exitModalBtn = document.querySelector(".exit-button");
const editProfileBtns = document.querySelectorAll(".edit-profile-button");
const removePictureBtn = document.querySelector("#remove-picture");
const submitBtn = document.querySelector("#submit-button");

// when file is selected, change image preview
const changePhoto = (event) => {
    const newImage = document.getElementById("newimage");
    newImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.querySelector("#description").value = "";
    }
};

exitModalBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
    document.querySelector("#description").value = "";
});

removePictureBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const response_status = await userManager.setDefaultPhoto();

        if (response_status === 200) {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
});

for (const editProfileBtn of editProfileBtns) {
    editProfileBtn.addEventListener("click", async (event) => {
        // set data to modal
        const search_params = new URLSearchParams(window.location.search);
        const user = await userManager.getUser(search_params.get("user"));
        const newImage = document.querySelector("#newimage");
        document.querySelector("#description").value = user.description;
        newImage.setAttribute("src", user.photoUrl);

        // disable removing of picture when profile is default
        if (user.photoUrl === "images/empty-profile.png") {
            const removePictureBtn = document.querySelector("#remove-picture");
            removePictureBtn.disabled = true;
            removePictureBtn.classList.add("noHover");
        }

        // display the modal
        modal.style.display = "block";
    });
}

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const search_params = new URLSearchParams(window.location.search);
    const username = search_params.get("user");
    const description = document.querySelector("#description").value;
    const inputFile = document.querySelector("#file").files[0];
    const formData = new FormData();

    formData.set("description", description);
    formData.set("file", inputFile);

    console.log(formData.get("description"));
    console.log(formData.get("file"));

    try {
        if (!inputFile) {
            // if user selected no file, then retain profile photo
            await userManager.editDescOnly(username, description);
        } else {
            // otherwise, change both their profile photo and description
            await userManager.editProfile(username, formData);
        }

        modal.style.display = "none";
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
});

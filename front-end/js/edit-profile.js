const modal = document.querySelector(".edit-profile-modal");
const exitModalBtn = document.querySelector(".exit-button");
const editProfileBtns = document.querySelectorAll(".edit-profile-button");
const removePictureBtn = document.querySelector("#remove-picture");

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
        const search_params = new URLSearchParams(window.location.search)
        user = await userManager.getUser(search_params.get("user"));
        document.querySelector("#description").value = user.description;
        document.querySelector("#newimage").src = user.photoUrl;
        modal.style.display = "block";
        if($("#newimage").attr("src") === "images/empty-profile.png") {
            $("#remove-picture").attr('disabled', 'disabled')
            $("#remove-picture").addClass('noHover')
        }
    });
}

const changePhoto = (event) => {
    const new_image = document.getElementById("newimage");
    new_image.src = URL.createObjectURL(event.target.files[0]);
};

$("#submit-button").click(async (e) => {
    e.preventDefault()
    const search_params = new URLSearchParams(window.location.search)
    const username = search_params.get("user")

    const description = $("#description").val()
    const input_file = $("#file").get(0).files[0]
    const formData = new FormData()
    
    formData.set('description', description)
    formData.set('file', input_file)

    if(!input_file) {
        try {
            await userManager.editDescOnly(username, description)
            modal.style.display = "none"
            window.location.reload()
        } catch(err) {
            console.error(err)
        }
    } else {
        try {
            await userManager.editProfile(username, formData)
            modal.style.display = "none"
            window.location.reload()
        } catch(err) {
            console.error(err)
        }
    }
})
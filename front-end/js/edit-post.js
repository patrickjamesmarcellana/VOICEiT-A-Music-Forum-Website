//eventlistener for clicking the edit button (redirects to edit-post.html)
$(".edit-post-button").click(function(e) {
    window.location.href = "edit-post.html?post=" + e.currentTarget.closest(".post-container").getAttribute("post-id");
})
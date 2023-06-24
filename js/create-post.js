$(".post-title-input").on("input", function() {
    this.css("height", "auto");
    this.css("height", this.scrollHeight + "px");
});
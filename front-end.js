$(document).ready(function() {
    // for dynamic content sizing when adjusting window size
    var post_panel = $(".post-panel");
    var post_container = $(".post-container");
    
    var register_button = $(".register-button");
    var topics_button = $(".topics-button");
    
    function adjust_window() {
        console.log(window.innerWidth);
        if(window.innerWidth <= 958) {
            post_panel.css("width", "100vw");
            post_panel.css("margin-left", "0px");
            register_button.css("margin-left", "1.2vw");
            topics_button.css("margin-right", "0px"); 
        } else if(window.innerWidth <= 1247) {
            post_panel.css("width", "76vw");
            post_panel.css("margin-left", "0px");
            register_button.css("margin-left", "1.2vw");
            topics_button.css("margin-right", "0px"); 
        } else {
            post_panel.css("width", "56vw");
            post_panel.css("margin-left", "257px");
            register_button.css("margin-left", "auto");
        }
    }
    
    window.onresize = adjust_window;

    // sample posts loop
    let sample_post_a = $(".post-container").html()
    for(let i = 0; i < 14; i++) {
        post_panel.append("<div class=\"post-container\">" + sample_post_a + "<div>");
    }
})




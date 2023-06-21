$(document).ready(function() {

    // for dynamic content sizing when adjusting window size
    const post_panel = $(".post-panel");
    const register_button = $(".register-button");
    const topics_button = $(".topics-button");
    const nav_profile = $(".nav-profile");
    const nav_profile_name = $(".nav-profile-name");
    const logout_button = $(".logout-button");
    
    function adjust_window() {
        if(window.innerWidth <= 958) {
            post_panel.css("width", "100vw");
            post_panel.css("margin-left", "0px");
            register_button.css("margin-left", "1.2vw");
            topics_button.css("margin-right", "0px"); 
            nav_profile.css("margin-left", "2vw")
        } else if(window.innerWidth <= 1247) {
            post_panel.css("width", "76vw");
            post_panel.css("margin-left", "0px");
            register_button.css("margin-left", "1.2vw");
            topics_button.css("margin-right", "0px");
            nav_profile.css("margin-left", "2vw")
        } else {
            post_panel.css("width", "56vw");
            post_panel.css("margin-left", "257px");
            register_button.css("margin-left", "auto");
            nav_profile.css("margin-left", "auto")
        }

        if(window.innerWidth <= 706) {
            nav_profile.css("display", "none");
            nav_profile_name.css("display", "none");
            logout_button.css("display", "none");
        } else {
            nav_profile.css("display", "flex");
            nav_profile_name.css("display", "flex");
            logout_button.css("display", "flex")
        }
    }
    
    window.onresize = adjust_window;
    window.onload = adjust_window;


    // sample posts loop
    const sample_post_a = $(".post-container").html();
    const see_more_panel = $(".see-more-panel");
    see_more_panel.remove();
    for(let i = 0; i < 14; i++) {
        post_panel.append("<div class=\"post-container\">" + sample_post_a + "</div>");
    }
    post_panel.append(see_more_panel);


    // making post containers a clickable container to post.html
    const post_container = $(".post-container");
    post_container.click(function() {
        window.location.href = "post.html";
    })


    // changing nav bar button when logged in 
    const nav_buttons_panel = $(".nav-buttons-panel");
    const nav_button = $(".nav-button");
    const user_buttons = $(".user-buttons");

    const logged_in = false; // default value of website: user is logged out
    /* sample values for variables */
    const username = `mrdoggo`;
    const profile_photo = `images/empty-profile.png`;
    if(logged_in) {
        nav_button.remove();
        user_buttons.remove();
        nav_buttons_panel.append(`
            <span class="user-buttons dropdown">
                <button class="dropdown-button">
                    <img class="icon nav-icons" src="images/user.png">
                    <i class="arrow down"></i>
                </button>
                        
                <div class="dropdown-content options-panel">
                    <br>
                    <span class="side-panel-text">USER OPTIONS</span>
                    <a class="side-panel-a-buttons" href="profile.html">
                        <span class="profile-sprite"></span>
                        Profile
                    </a>
                    <a class="side-panel-a-buttons" href="index.html">
                        <span class="logout-sprite"></span>
                        Logout
                    </a>
                </div>
            </span>
            <a class="post-profile nav-profile" href="profile.html">
                <img class="post-profile-photo" src="${profile_photo}">
            </a>
            <a class="post-profile nav-profile-name" href="profile.html">
                ${username}
            </a>
            <button class="logout-button">
                <span class="logout-sprite">
            </button>   
        `)
    } else {
        nav_button.remove();
        user_buttons.remove();
        nav_buttons_panel.append(`
        <span class="user-buttons dropdown">
            <button class="dropdown-button">
                <img class="icon nav-icons" src="images/user.png">
                <i class="arrow down"></i>
            </button>
            
            <div class="dropdown-content options-panel">
                <br>
                <span class="side-panel-text">USER OPTIONS</span>
                <a class="side-panel-a-buttons" href="register.html">
                    <span class="register-sprite"></span>
                    Register
                </a>
                <a class="side-panel-a-buttons" href="Register.html">
                    <span class="login-sprite"></span>
                    Login
                </a>
            </div>
        </span>
        <a class="register-button nav-button" href="register.html">Register</a>
        <a class="login-button nav-button" href="register.html">Log-in</a>
        `);
    }
})
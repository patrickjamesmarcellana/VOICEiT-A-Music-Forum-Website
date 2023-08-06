import postManager from "./model/post-manager.js"
import setInfiniteScrollHandler from "./pagination.js"

import postViewManager from "./view/post-view.js"

import forums from "./forums.js"

import Cookies from "./js.cookie-3.0.5.min.mjs"
import is_logged_in from "./auth.js"

function formatDate(date) {
    if(typeof date === "string") {
        date = new Date(date);
    }
    console.log(typeof date)

    return `${date.toDateString('en-CA')} | ${date.toLocaleTimeString(/* locale */ undefined, /* options */ {hour: '2-digit', minute:'2-digit'})}`;
}

async function logout() {
    await fetch("/api/auth/logout", {method: "POST"});
    window.location.reload();
}

// let javascript:logout() work
window.logout = logout

$(document).ready(async function() {
    // load the nav bar and side panel a on all applicable pages
    // IMPORTANT: THIS MUST BE THE FIRST THING TO HAPPEN (otherwise $(document).ready calls on other JS files that need the navbar might fail like in search.js)
    
    // note: if function is not defined then it is was intentionally not included for this page
    //       there is no need to error out and stop the rest of this function from running
    if(typeof load_navbar !== "undefined")
        load_navbar();
    
    if(typeof load_side_panel_a !== "undefined")
        load_side_panel_a();

    /* changing nav-bar and side-panel-a's views when logging in */
    const side_panel_bottom = $(".side-panel-bottom");
    const username = Cookies.get("logged_in_as");
    let profile_photo = "/images/empty-profile.png";
    if (username) {
        const response = await fetch("api/users/" + username);
        const currentUser = await response.json();
        profile_photo = currentUser.photoUrl;
    }



    // action listener for logout button
    $(".logout-button").click(logout);

    // check if the user is logged in or not
    if(is_logged_in()) {
        // redirect to index.html
        // window.location.href = "index.html";

        // remove register and login buttons from nav-bar
        $(".nav-button").remove();
        $(".user-buttons").remove();

        // add logout and profile button on nav-bar
        $(".logout-button").css("display", "flex");
        $(".logout-button").before(`
            <span class="user-buttons dropdown">
                <button class="dropdown-button">
                    <img class="icon nav-icons" src="images/user.png">
                    <i class="arrow down"></i>
                </button>
                        
                <div class="dropdown-content options-panel">
                    <br>
                    <span class="side-panel-text">USER OPTIONS</span>
                    <a class="side-panel-a-buttons" href="profile.html?user=${username}">
                        <span class="profile-sprite"></span>
                        Profile
                    </a>
                    <a class="side-panel-a-buttons" href="javascript:logout()">
                        <span class="logout-sprite"></span>
                        Logout
                    </a>
                </div>
            </span>
            <a class="nav-profile" href="profile.html?user=${username}">
                <img class="nav-profile-photo" src="${profile_photo}">
            </a>
            <a class="nav-profile-name" href="profile.html?user=${username}">
                ${username}
            </a> 
        `);

        // remove left side-panel's text ("Join the growing community...")
        $(".side-panel-bottom").remove();

        // Change logged in photo 
        $(".logged-in-photo").attr("src", profile_photo);

        // make create-post container appear
        $(".create-post-container").css("display", "flex");
    } else {
        // remove profile and logout buttons from nav-bar
        $(".user-buttons").remove();
        $(".nav-profile").remove();
        $(".nav-profile-name").remove();

         // add register and login buttons back to nav-bar
        $(".nav-buttons-panel").append(`
            <span class="user-buttons dropdown">
                <button class="dropdown-button">
                   <img class="icon nav-icons" src="images/empty-profile.png">
                   <i class="arrow down"></i>
                </button>
                
                <div class="dropdown-content options-panel">
                    <br>
                    <span class="side-panel-text">USER OPTIONS</span>
                    <a class="side-panel-a-buttons" href="register.html">
                        <span class="register-sprite"></span>
                        Register
                    </a>
                    <a class="side-panel-a-buttons" href="login.html">
                        <span class="login-sprite"></span>
                        Login
                    </a>
                </div>
            </span>
        `);
 
        // place back side-panel-a's bottom panel ("Join the...")
        $(".side-panel-a").append(side_panel_bottom);
 
        // make create-post container disappear
        $(".create-post-container").css("display", "none");
 
        // make logout button disappear
        $(".logout-button").css("display", "none");
    }

    // for dynamic content sizing when adjusting window size
    function adjust_window() {
        if(window.visualViewport.width <= 1080) {
            $(".side-panel-b").display("none")
        }
        if(window.innerWidth <= 958) {
            $(".post-panel").css("width", "100vw");
            $(".register-button").css("margin-left", "1.2vw");
            $(".topics-button").css("margin-right", "0px"); 
            $(".nav-profile").css("margin-left", "2vw")
        } else if(window.innerWidth <= 1247) {
            $(".post-panel").css("width", "76vw");
            $(".register-button").css("margin-left", "1.2vw");
            $(".topics-button").css("margin-right", "0px");
            $(".nav-profile").css("margin-left", "2vw")
        } else {
            $(".post-panel").css("width", "56vw");
            $(".register-button").css("margin-left", "auto");
            $(".nav-profile").css("margin-left", "auto")
        }

        if(window.innerWidth <= 706) {
            $(".nav-profile").css("display", "none");
            $(".nav-profile-name").css("display", "none");
        } else {
            $(".nav-profile").css("display", "flex");
            $(".nav-profile-name").css("display", "flex");
        }

        if(is_logged_in()) {
            if(window.innerWidth <= 706)
                $(".logout-button").css("display", "none");
            else
                $(".logout-button").css("display", "flex");
        }
    }
    adjust_window();

    window.onresize = adjust_window;


    // sample posts loop
    /*const see_more_panel = $(".see-more-panel");
    $(".see-more-panel").remove();
    for(let i = 0; i < 14; i++) {
        $(".post-panel").append("<div class=\"post-container post-container-clickable\">" + $(".post-container").html() + "</div>");
    }
    $(".post-panel").append(see_more_panel);*/


    // making post containers a clickable container to post.html
    /*$(".post-container-clickable").click(function(e) {
        window.location.href = "post.html?post=" + e.currentTarget.getAttribute("post-id");
    })*/

    
    // changing subforums
    const URL_FORUM_KEY = "forum";
    const forum_description = $(".forum-description");
    const forum_name = $(".forum-name");

    async function changeForum(forum_id) {
        // are we in index.html
        // TODO: GET RID OF THIS
        const cur_page = window.location.pathname.split("/").pop();
        if(cur_page === "index.html" || cur_page === "") {
            //window.location.href = `index.html?forum=${forum_id}`;
            forum_name.text(forums[forum_id].name);
            forum_description.html(forums[forum_id].description);
            
            // erase
            $(".see-more-panel").remove();
            $(".post-container").remove();
            
            /* parameter is load more posts function based on given cursor and requested number of posts */
            setInfiniteScrollHandler(
                async(num_posts) => {
                    return await postManager.getSubforumPosts(forum_id, new URLSearchParams([["post_limit", num_posts]]))
                },
                async (last_sent_post, num_posts) => {
                    const queryParams = new URLSearchParams()
        
                    if(forum_id == "popular") {
                        queryParams.append("last_sent_views", last_sent_post.views)
                        queryParams.append("last_sent_id", last_sent_post.post_id)
                    } else {
                        queryParams.append("last_sent_datetime", last_sent_post.date.toJSON()    )
                        queryParams.append("last_sent_id", last_sent_post.post_id)
                    }
                    queryParams.append("post_limit", num_posts)

                    return await postManager.getSubforumPosts(forum_id, queryParams)
                },
                async (post) => {
                    postViewManager.insert_post(post)
                },
                async () => (await postManager.getSubforumPostCount(forum_id)))
                
        } else {
            window.location.href = `index.html?forum=${forum_id}`
        }
    }

    const search_params = new URLSearchParams(window.location.search);

    // should we change the forum
    const cur_page = window.location.pathname.split("/").pop();
    if(cur_page === "index.html" || cur_page === "") { // dirty hack TODO: GET RID OF THIS
        const goto_forum_id = search_params.get(URL_FORUM_KEY);
        if(goto_forum_id != null) {
            await changeForum(goto_forum_id);
        } else {
            await changeForum("home");
        }
    }

    // event listeners for side panel a buttons (changing the forum info on side panel b)
    for (let forum_id in forums) {
        // copy the forum_id to a constant for the event listener
        const forum_id_copy = forum_id;
        $("." + forum_id).click(async function() {
            await changeForum(forum_id_copy);
        });
    }

    const URL_USER_KEY = "user";
    const profile_username = $(".profile-username");
    const profile_picture  = $(".profile-picture > img");
    const user_description = $(".user-description");
    const user_last_login = $(".user-last-login > span:nth-child(2)");
    const user_register_date = $(".user-register-date > span:nth-child(2)")
    // const nav_bar_profile = ${}

    async function changeProfile(user_id) {
        const response = await fetch("api/users/" + user_id)
        const user = await response.json()

        // are we in profile.html
        if(window.location.pathname.split("/").pop() == "profile.html") {
            //window.location.href = `index.html?user=${username}`;
            profile_username.text(user.username);
            profile_picture.attr("src", user.photoUrl)
            user_description.text(user.description);
            user_last_login.text(formatDate(user.lastLogin));
            user_register_date.text(formatDate(user.registerDate));

            setEditProfileBtnVisibility(user_id);
        } else {
            window.location.href = `index.html?user=${user_id}`
        }
    }

    function setEditProfileBtnVisibility(user_id) {
        let displayMode = "none";
        if (is_logged_in() && user_id === Cookies.get("logged_in_as")) {
            displayMode = "block";
        }
        const editProfileBtns = $(".edit-profile-button");
        for (const editProfileBtn of editProfileBtns) {
            editProfileBtn.style.display = displayMode;
        }
    }

    // should we change the profile
    const goto_user_id = search_params.get(URL_USER_KEY);
    if(goto_user_id != null) {
        await changeProfile(goto_user_id);
    }

    // making the title panel (page title + logo) clickable to redirect to home page
    $(".title-panel").click(function() {
        window.location.href = "index.html";
    });

    // making logged-in profiles clickable to redirect to profile page
    $(".logged-in-photo").click(function() {
        // window.location.href = "profile.html";
        window.location.href = "profile.html?user=" + Cookies.get("logged_in_as")
    });

    // action listener for create post box to redirect to create-post.html
    $(".create-post-box").click(function() {
        window.location.href = "create-post.html";
    });

    //eventlistener for clicking the edit button (redirects to edit-post.html)
    $(".edit-post-button").click(function(e) {
        window.location.href = "edit-post.html?post=" + e.currentTarget.closest(".post-container").getAttribute("post-id");
    })

    $("#search-form").submit((e) => {
        const search_box = document.querySelector("#search-input")
        let value = $("#search-input").val()
        value = value.trim()
        if(value === "") {
            e.preventDefault()
            search_box.setCustomValidity('You can\'t leave a blank search keyword.')
        }
    })

    $("#search-form").on('input', (e) => {
        const search_box = document.querySelector("#search-input")
        search_box.setCustomValidity('')
    })
});
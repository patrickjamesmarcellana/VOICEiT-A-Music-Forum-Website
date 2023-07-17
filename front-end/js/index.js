function Forum(name, description) {
    this.name = name;
    this.description = description;
}

function formatDate(date) {
    if(typeof date === "string") {
        date = new Date(date);
    }
    console.log(typeof date)

    return `${date.toDateString('en-CA')} | ${date.toLocaleTimeString(/* locale */ undefined, /* options */ {hour: '2-digit', minute:'2-digit'})}`;
}
// forums list
const forums = {
    home: new Forum("Recent", `
            You are now in the Recent forum — VOICEiT's home page.
            The posts you see are the recently posted voice-its.
            Interact with fellow users and share your thoughts about the different genres of music!
        `),

    popular: new Forum("Popular", `
            You are now in the Popular forum.
            The posts you see are the most popular voice-its based on a calculated ranking.
            Interact with fellow users and share your thoughts about the different genres of music!
        `),

    alternative: new Forum("Alternative", `
            Alternative rock is a subgenre of rock music that evolved from the 1970s independent music underground
            and became prominent in the 1990s. The term "alternative" alludes to how the genre differs from mainstream 
            or commercial rock or pop music. <br><br>
            Interact with fellow users and share your thoughts about alternative music!
        `),

    classical: new Forum("Classical", `
            In general, the term "classical music" refers to Western art music, which is distinguished from 
            Western folk music or popular music traditions. It is frequently referred to as Western classical music,
            since "classical music" also refers to non-Western art music. <br><br>
            Interact with fellow users and share your thoughts about classical music!
        `),

    country: new Forum("Country", `
            Known for its basic style, folk lyrics, and harmonies, country music is characterized by its ballads
            and dancing melodies, which are accompanied by instruments including banjos, fiddles, harmonicas, and
            other varieties of guitar, including acoustic, electric, steel, and resonator guitars.<br><br>
            Interact with fellow users and share your thoughts about country music!
        `),

    jazz: new Forum("Jazz", `
            Jazz is commonly characterized by syncopated rhythms, polyphonic ensemble playing, varied degrees
            of improvisation, frequently deliberate pitch deviations, and the incorporation of original timbres.
            It was largely influenced by ragtime and the blues.<br><br>
            Interact with fellow users and share your thoughts about jazz music!
        `),

    kpop: new Forum("Kpop", `
            K-pop, or Korean Pop, is the 21st century's prevailing, aesthetic-driven, style-bending, trendsetting
            music genre. K-pop, which originated in South Korea, takes influences from a variety of genres,
            including pop, experimental, rock, hip-hop, R&B, electronic, and dance. <br><br>
            Interact with fellow users and share your thoughts about kpop!
        `),

    latin: new Forum("Latin", `
            The music industry uses the phrase "Latin music" to refer to numerous kinds of music from Ibero-America,
            which includes Latin America, Spain, Portugal, and the Latino community in Canada and the United States,
            as well as songs sung in either Spanish or Portuguese.<br><br>
            Interact with fellow users and share your thoughts about latin music!
        `),

    pop: new Forum("Pop", `
            Pop music is distinguished by recurrent choruses and hooks, short to medium-length songs produced
            in a basic style (typically the verse-chorus structure), and rhythms or tempos that are easy to
            dance to. A lot of pop music takes aspects from other genres like rock, urban, dance, Latin, and country. <br><br>
            Interact with fellow users and share your thoughts about pop music!
        `),

    rnb: new Forum("R&B", `
            Rhythm and blues, also known as R&B or R'n'B, is a popular music genre that emerged among
            African-American communities in the 1940s. Lyrical topics in R&B frequently express the African-American
            experience of suffering and the struggle for freedom and joy, as well as victories and failures in relationships,
            finances, and aspirations. <br><br>
            Interact with fellow users and share your thoughts about RnB music!
        `),

    rap: new Forum("Rap", `
            Hip hop music, often known as rap music and formerly known as disco rap, is a popular music genre
            that comprises of stylized rhythmic music (typically constructed around drum beats) that frequently
            accompanies a rhythmic and rhyming speech called rapping.<br><br>
            Interact with fellow users and share your thoughts about rap music!
        `),

    rock: new Forum("Rock", `
            Rock music is a diverse genre of popular music that began in the United States as "rock and roll". 
            Rock has centered on the electric guitar as an instrument, usually as part of a rock band with an 
            electric bass guitar, drums, and one or more singers.<br><br>
            Interact with fellow users and share your thoughts about rock music!
        `),
}

function is_logged_in() {
    return Cookies.get("logged_in_as");
}

async function logout() {
    await fetch("/api/auth/logout", {method: "POST"});
    window.location.reload();
}

$(document).ready(async function() {
    if(typeof Cookies === "undefined") {
        console.log("Downloading js-cookie");
        await $.getScript("/js/js.cookie-3.0.5.min.js");
    }

    /* changing nav-bar and side-panel-a's views when logging in */
    const side_panel_bottom = $(".side-panel-bottom");
    const username = Cookies.get("logged_in_as");
    const profile_photo = `images/${username}.jpg`;

    // load the nav bar and side panel a on all applicable pages
    // note: if function is not defined then it is was intentionally not included for this page
    //       there is no need to error out and stop the rest of this function from running
    if(typeof load_navbar !== "undefined")
        load_navbar();
    
    if(typeof load_side_panel_a !== "undefined")
        load_side_panel_a();

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

        // remove see-more-panel
        $(".see-more-panel").css("display", "none");
    } else {
        // remove profile and logout buttons from nav-bar
        $(".user-buttons").remove();
        $(".nav-profile").remove();
        $(".nav-profile-name").remove();

         // add register and login buttons back to nav-bar
        $(".nav-buttons-panel").append(`
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

        // add see-more-panel
        $(".see-more-panel").css("display", "flex");
    }

    // for dynamic content sizing when adjusting window size
    function adjust_window() {
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
    
    window.onresize = adjust_window;
    window.onload = adjust_window;


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

            let posts_list = await postManager.getSubforumPosts(forum_id) // get all posts
            const see_more_panel = $(".see-more-panel");
            console.log("UNBREAKABLE *********")
            console.log(posts_list)

            // erase
            $(".see-more-panel").remove();
            $(".post-container").remove();

            // append the first 5 posts
            let added_posts = 0
            let posts_to_add = 5
            for(let i = 0; i < posts_to_add && added_posts < posts_list.length; i++) {
                postViewManager.insert_post(posts_list[added_posts])
                added_posts += 1
            }
            $(".post-panel").append(see_more_panel);

            // add 5 posts each time the window scrolls to the bottom
            let loading= false;
            $(window).scroll(async function() {
                if (!loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 100) &&
                    added_posts < posts_list.length) {
                    loading= true;
                    $(".see-more-panel").remove();
                    // call for query cursor
                    // posts_list = await postManager.getSubforumPosts(forum_id)

                    for(let i = 0; i < posts_to_add && added_posts < posts_list.length; i++) {
                        postViewManager.insert_post(posts_list[added_posts])
                        added_posts += 1
                    }
                    $(".post-panel").append(see_more_panel);
                    loading = false; // reset value of loading once content loaded
                }
            });
            
            
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
        // TODO: change this once sessions are implemented
        // Since only one user can log in for now, the edit profile
        // button is only displayed when the user is logged in and is
        // viewing that one user's profile
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

    $(".post-profile, .nav-profile").click(async function() {
        await changeProfile($(".post-profile, .nav-profile").text());
    })


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

    // action listeners for analytics container
    // await $(".view-analytics-button").click(function() {
    //     $(".analytics-container").css("display", "block")
    // })
    
    // await $(".exit-button").click(function() {
    //     $(".analytics-container").css("display", "none")
    // })

    // await $(".analytics-container").click(function() {
    //     $(".analytics-container").css("display", "none")
    // })

});
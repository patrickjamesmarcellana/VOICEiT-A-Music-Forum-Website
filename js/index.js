function logout() {
    sessionStorage.setItem("logged_in", "false");
    location.reload();
}

$(document).ready(function() {
    /* changing nav-bar and side-panel-a's views when logging in */
    const side_panel_bottom = $(".side-panel-bottom");
    const username = `melissa_spellman`;
    const profile_photo = `images/${username}.jpg`;

    // load the nav bar and side panel a on all applicable pages
    // note: if function is not defined then it is was intentionally not included for this page
    //       there is no need to error out and stop the rest of this function from running
    if(typeof load_navbar !== "undefined")
        load_navbar();
    
    if(typeof load_side_panel_a !== "undefined")
        load_side_panel_a();

    // action listener for logout button
    $(".logout-button").click(function() { 
        window.location.href = "javascript:logout()";
    });

    // action listener for login and register Button (MCO1 hardcoded profile)
    $(".submit-form-button").click(function(e) {
        e.preventDefault();
        sessionStorage.setItem("logged_in", "true");
    });

    // check if the user is logged in or not
    if(sessionStorage.getItem("logged_in") === "true") {
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
                    <a class="side-panel-a-buttons" href="profile.html">
                        <span class="profile-sprite"></span>
                        Profile
                    </a>
                    <a class="side-panel-a-buttons" href="javascript:logout()">
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
        `);

        // remove left side-panel's text ("Join the growing community...")
        $(".side-panel-bottom").remove();

        // TODO: 3 scenarios for edit profile button
        // 1. If user is not logged in, there is no edit profile button.
        // 2. If user is logged in and they are not viewing their profile,
        //    there is also no edit profile button.
        // 3. Otherwise, when the user is logged and is viewing their profile,
        //    there is an edit profile button.
        // 
        // This currently displays the edit profile button as long as the user
        // is logged in, regardless of whether they are viewing their profile
        // or someone else's.
        $(".edit-profile-button").css("display", "block");

        // Change logged in photo 
        $(".logged-in-photo").attr("src", profile_photo);

        // make create-post container appear
        $(".create-post-container").css("display", "flex");
    } else if(sessionStorage.getItem("logged_in") === "false") {
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

        // location.reload();
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

        if(sessionStorage.getItem("logged_in") === "true") {
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
    function Forum(name, description) {
        this.name = name;
        this.description = description;
    }
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

    const URL_FORUM_KEY = "forum";
    const forum_description = $(".forum-description");
    const forum_name = $(".forum-name");

    function changeForum(forum_id) {
        // are we in index.html
        if(window.location.pathname.split("/").pop() == "index.html") {
            //window.location.href = `index.html?forum=${forum_id}`;
            forum_name.text(forums[forum_id].name);
            forum_description.html(forums[forum_id].description);

            // load the posts of the forum
            let posts_list = []
            if(forum_id !== "home" && forum_id !== "popular") {
                posts_list = Object.entries(posts).filter((kvpair) => (kvpair[1].subforum === forum_id));
            } else {
                posts_list = Object.entries(posts);
            }
            
            const see_more_panel = $(".see-more-panel");
            
            // erase
            $(".see-more-panel").remove();
            $(".post-container").remove();

            
            for(let i = 0; i < Math.min(20, posts_list.length); i++) {
                const key = posts_list[i][0];
                const val = posts_list[i][1];
                $(".post-panel").append(`
                <div class="post-container post-container-clickable" post-id="${key}">
                    <div class="post-header"> 
                        <a class="post-profile">
                            <img class="post-profile-photo" src="images/${val.op}.jpg">
                        </a>

                        <a class="post-profile">
                            ${val.op}
                        </a>
                    </div>
                
                    <div class="post-content" >
                        <div class="post-title">
                            ${val.title}
                        </div>

                        <a class="post-subforum ${val.subforum}"> ${forums[val.subforum].name} </a>

                        <div class="post-body">
                            ${val.text}
                        </div>

                        <div class="post-buttons">
                            <button class="upvote-sprite"></button>
                            <span class="upvote-count">5</span>
                            <button class="downvote-sprite"></button>
                            <span class="downvote-count">5</span>
                            <a class="comment-sprite" href="post.html?post=${key}"></a>
                            <a class="comment-count" href="post.html?post=${key}">${comment_count(val.top_level_comments_list)}</a>
                        </div>
                    </div>
                </div>
                `);
            }
            
            $(".post-panel").append(see_more_panel);
            // making post containers a clickable container to post.html
            $(".post-container-clickable").click(function(e) {
                window.location.href = "post.html?post=" + e.currentTarget.getAttribute("post-id");
            })
        } else {
            window.location.href = `index.html?forum=${forum_id}`
        }
    }

    const search_params = new URLSearchParams(window.location.search);

    // should we change the forum
    if(window.location.pathname.split("/").pop() == "index.html") { // dirty hack
        const goto_forum_id = search_params.get(URL_FORUM_KEY);
        if(goto_forum_id != null) {
            changeForum(goto_forum_id);
        } else {
            changeForum("home");
        }
    }

    // event listeners for side panel a buttons (changing the forum info on side panel b)
    for (let forum_id in forums) {
        // copy the forum_id to a constant for the event listener
        const forum_id_copy = forum_id;
        $("." + forum_id).click(function() {
            changeForum(forum_id_copy);
        });
    }

    function User(username, description) {
        this.username = username;
        this.description = description;
    }

    // hardcoded user profiles 
    const users = {
        melissa_spellman: new User(`melissa_spellman`, `
            Hi! I'm a neuroscientist student from Johns Hopkins University, and I'm highly invested in how music transcends
            generations. Currently, my favorite genres of music are classical, jazz, and R&B. Hit me up on my personal email
            if you'd like to discuss music on your leisure time!

            Email: melissa_spellman@yahoo.com
        `),
        draeznor_rock_lover: new User(`draeznor_rock_lover`, `
            I've been an avid fan of rock and hiphop music since the 1990s. Red Hot Chili Peppers (a rock band) made me
            become a fan of their music, oh I love them! Eventually, I became a fan of the genre itself.
        `),
        jennie_itgirl: new User(`jennie_itgirl`, `
            An honest kpop fan. Jennie Ruby Jane my idol <3. Posts about kpop and Blackpink in general, but I also love
            posting about other music genres.
        `),
        marithus_25: new User(`marithus_25`, `
            Country music is such an underrated genre. Here to spread country music to fellow music listeners! I have also 
            been exploring latin music, and Bad Bunny is such an amazing artist.
        `),
        aria_eagleheart: new User(`aria_eagleheart`, ``)
    };

    const URL_USER_KEY = "user";
    const profile_username = $(".profile-username");
    const profile_picture  = $(".profile-picture > img");
    const user_description = $(".user-description");

    function changeProfile(user_id) {
        // are we in profile.html
        if(window.location.pathname.split("/").pop() == "profile.html") {
            //window.location.href = `index.html?user=${username}`;
            profile_username.text(users[user_id].username);
            profile_picture.attr("src", `images/${users[user_id].username}.jpg`)
            user_description.text(users[user_id].description);

        } else {
            window.location.href = `index.html?user=${user_id}`
        }
    }

    // should we change the profile
    const goto_user_id = search_params.get(URL_USER_KEY);
    if(goto_user_id != null) {
        changeProfile(goto_user_id);
    }

    $(".post-profile").click(function() {
        changeProfile($(".post-profile").text());
    })


    // making the title panel (page title + logo) clickable to redirect to home page
    $(".title-panel").click(function() {
        window.location.href = "index.html";
    });


    // making logged-in profiles clickable to redirect to profile page
    $(".logged-in-photo").click(function() {
        window.location.href = "profile.html";
    });


    // action listener for create post box to redirect to create-post.html
    $(".create-post-box").click(function() {
        window.location.href = "create-post.html";
    });
});
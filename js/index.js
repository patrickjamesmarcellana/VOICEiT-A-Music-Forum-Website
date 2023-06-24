$(document).ready(function() {
    /* changing nav-bar and side-panel-a's views when logging in */
    const side_panel_bottom = $(".side-panel-bottom");
    //sessionStorage.setItem("log", "true");
    const username = `melissa_spellman`;
    const profile_photo = `images/user1.jpg`;

    // load the nav bar on all applicable pages
    load_navbar();

    // action listener for logout button
    if(sessionStorage.getItem("log")) { 
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
    };

    // action listener for Login and Register Button (MCO1 hardcoded profile)
    $(".submit-form-button").click(function(e) {
        e.preventDefault();

        // redirect to index.html
        window.location.href = "index.html";

        console.log("Hi");
        // remove register and login buttons from nav-bar
        $(".nav-button").remove();
        $(".user-buttons").remove();

        // add logout and profile button on nav-bar
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
    });


   if(sessionStorage.getItem("log") === "true") {

   } else if(sessionStorage.getItem("log") === "false") {
       
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
            $(".logout-button").css("display", "none");
        } else {
            $(".nav-profile").css("display", "flex");
            $(".nav-profile-name").css("display", "flex");
        }
    }
    
    window.onresize = adjust_window;
    window.onload = adjust_window;


    // sample posts loop
    const see_more_panel = $(".see-more-panel");
    $(".see-more-panel").remove();
    for(let i = 0; i < 14; i++) {
        $(".post-panel").append("<div class=\"post-container post-container-clickable\">" + $(".post-container").html() + "</div>");
    }
    $(".post-panel").append(see_more_panel);


    // making post containers a clickable container to post.html
    $(".post-container").click(function() {
        window.location.href = "post.html";
    })


    // event listeners for side panel a buttons (changing the forum info on side panel b)
    const forum_description = $(".forum-description");
    const forum_name = $(".forum-name");
    
    $(".home").click(function() {
        forum_name.text("Recent");
        forum_description.text(`
            You are now in the Recent forum — VOICEiT's home page.
            The posts you see are the recently posted voice-its.
            Interact with fellow users and share your thoughts about the different genres of music!
        `);
    });

    $(".popular").click(function() {
        forum_name.text("Popular");
        forum_description.text(`
            You are now in the Popular forum.
            The posts you see are the most popular voice-its based on a calculated ranking.
            Interact with fellow users and share your thoughts about the different genres of music!
        `);
    });

    $(".alternative").click(function() {
        forum_name.text("Alternative");
        forum_description.html(`
            Alternative rock is a subgenre of rock music that evolved from the 1970s independent music underground
            and became prominent in the 1990s. The term "alternative" alludes to how the genre differs from mainstream 
            or commercial rock or pop music. <br><br>
            Interact with fellow users and share your thoughts about alternative music!
        `);
    });

    $(".classical").click(function() {
        forum_name.text("Classical");
        forum_description.html(`
            In general, the term "classical music" refers to Western art music, which is distinguished from 
            Western folk music or popular music traditions. It is frequently referred to as Western classical music,
            since "classical music" also refers to non-Western art music. <br><br>
            Interact with fellow users and share your thoughts about classical music!
        `);
    });

    $(".country").click(function() {
        forum_name.text("Country");
        forum_description.html(`
            Known for its basic style, folk lyrics, and harmonies, country music is characterized by its ballads
            and dancing melodies, which are accompanied by instruments including banjos, fiddles, harmonicas, and
            other varieties of guitar, including acoustic, electric, steel, and resonator guitars.<br><br>
            Interact with fellow users and share your thoughts about country music!
        `);
    });

    $(".jazz").click(function() {
        forum_name.text("Jazz");
        forum_description.html(`
            Jazz is commonly characterized by syncopated rhythms, polyphonic ensemble playing, varied degrees
            of improvisation, frequently deliberate pitch deviations, and the incorporation of original timbres.
            It was largely influenced by ragtime and the blues.<br><br>
            Interact with fellow users and share your thoughts about jazz music!
        `);
    });

    $(".kpop").click(function() {
        forum_name.text("Kpop");
        forum_description.html(`
            K-pop, or Korean Pop, is the 21st century's prevailing, aesthetic-driven, style-bending, trendsetting
            music genre. K-pop, which originated in South Korea, takes influences from a variety of genres,
            including pop, experimental, rock, hip-hop, R&B, electronic, and dance. <br><br>
            Interact with fellow users and share your thoughts about kpop!
        `);
    });

    $(".latin").click(function() {
        forum_name.text("Latin");
        forum_description.html(`
            The music industry uses the phrase "Latin music" to refer to numerous kinds of music from Ibero-America,
            which includes Latin America, Spain, Portugal, and the Latino community in Canada and the United States,
            as well as songs sung in either Spanish or Portuguese.<br><br>
            Interact with fellow users and share your thoughts about latin music!
        `);
    });

    $(".pop").click(function() {
        forum_name.text("Pop");
        forum_description.html(`
            Pop music is distinguished by recurrent choruses and hooks, short to medium-length songs produced
            in a basic style (typically the verse-chorus structure), and rhythms or tempos that are easy to
            dance to. A lot of pop music takes aspects from other genres like rock, urban, dance, Latin, and country. <br><br>
            Interact with fellow users and share your thoughts about pop music!
        `);
    });

    $(".rnb").click(function() {
        forum_name.text("R&B");
        forum_description.html(`
            Rhythm and blues, also known as R&B or R'n'B, is a popular music genre that emerged among
            African-American communities in the 1940s. Lyrical topics in R&B frequently express the African-American
            experience of suffering and the struggle for freedom and joy, as well as victories and failures in relationships,
            finances, and aspirations. <br><br>
            Interact with fellow users and share your thoughts about RnB music!
        `);
    });

    $(".rap").click(function() {
        forum_name.text("Rap");
        forum_description.html(`
            Hip hop music, often known as rap music and formerly known as disco rap, is a popular music genre
            that comprises of stylized rhythmic music (typically constructed around drum beats) that frequently
            accompanies a rhythmic and rhyming speech called rapping.<br><br>
            Interact with fellow users and share your thoughts about rap music!
        `);
    });

    $(".rock").click(function() {
        forum_name.text("Rock");
        forum_description.html(`
            Rock music is a diverse genre of popular music that began in the United States as "rock and roll". 
            Rock has centered on the electric guitar as an instrument, usually as part of a rock band with an 
            electric bass guitar, drums, and one or more singers.<br><br>
            Interact with fellow users and share your thoughts about rock music!
        `);
    });


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
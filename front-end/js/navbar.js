// TODO: move to an html file once there is a server

navbar_html = `
<div class="nav-bar"> 
    <!-- Title + Logo -->
    <span class="title-panel">
        <a class="title-panel" href="#home">
            <img class="logo" src="images/logo2.png" title="VOICEiT Logo" alt="VOICEiT Logo">
        </a>
        <a class="title-text">VOICEiT</a>
    </span>

    <script src="js/navbar.js"></script>    <!-- Search Bar -->
    <span class="search-bar">
        <img class="search-sprite" src="images/search.png">
        <span class="search-inner-box">
            <form action="search.html" method="get" target="_self" id="search-form">
                <input id="search-input" class="search-box" type="search" name="search" placeholder="Search VOICEiT" autocomplete="off">
            </form>
        </span>
    </span>

    <!-- Navigation Bar Buttons -->
    <span class="nav-buttons-panel">
        <span class="topics-button dropdown">
            <button class="dropdown-button"> 
                <img class="icon nav-icons" src="images/topics.png">
                <i class="arrow down"></i>
            </button>

            <div class="topics-content options-panel dropdown-content">
                <br>
                <span class="side-panel-text">TIMELINE</span>
                <a class="side-panel-a-buttons home"> 
                    <span class="home-sprite"></span> 
                    Recent 
                </a>
                <a class="side-panel-a-buttons popular"> 
                    <span class="popular-sprite"></span> 
                    Popular 
                </a>
                <br>
                <span class="side-panel-text">TOPICS</span>
                <a class="side-panel-a-buttons alternative" >
                    <span class="alternative-sprite"></span> 
                    Alternative
                </a>
                <a class="side-panel-a-buttons classical">
                    <span class="classical-sprite"></span> 
                    Classical
                </a>
                <a class="side-panel-a-buttons country" >
                    <span class="country-sprite"></span> 
                    Country
                </a>
                <a class="side-panel-a-buttons jazz" >
                    <span class="jazz-sprite"></span> 
                    Jazz
                </a>
                <a class="side-panel-a-buttons kpop" >
                    <span class="kpop-sprite"></span> 
                    Kpop
                </a>
                <a class="side-panel-a-buttons latin" >
                    <span class="latin-sprite"></span> 
                    Latin
                </a>
                <a class="side-panel-a-buttons pop" >
                    <span class="pop-sprite"></span> 
                    Pop
                </a>
                <a class="side-panel-a-buttons rnb" >
                    <span class="rnb-sprite"></span> 
                    R&B
                </a>
                <a class="side-panel-a-buttons rap" >
                    <span class="rap-sprite"></span> 
                    Rap
                </a>
                <a class="side-panel-a-buttons rock" >
                    <span class="rock-sprite"></span> 
                    Rock
                </a>
            </div>
        </span>

        <span class="user-buttons dropdown">
            <button class="dropdown-button">
                <img class="icon nav-icons" src="images/user.png">
                <i class="arrow down"></i>
            </button>
            
            <div class="user-content dropdown-content options-panel">
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
        <a class="register-button nav-button" href="register.html">Register</a>
        <a class="login-button nav-button" href="login.html">Log-in</a>
        <button class="logout-button">
            <span class="logout-sprite">
        </button>  
    </span>
</div> 
` 
function load_navbar() {
    // nav bar loader
    $(".nav-bar").replaceWith(navbar_html);
}

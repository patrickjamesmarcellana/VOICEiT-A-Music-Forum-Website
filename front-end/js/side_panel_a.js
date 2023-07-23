side_panel_a_html = `
    <span class="side-panel-a">
        <div class="options-panel side-a-top-panel">
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
            <a class="side-panel-a-buttons classical" >
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
                
        <div class="side-panel-text side-panel-bottom">
            Join the growing community of VOICEiT to be able to post voice-its and join forums.
        </div>
    </span>
`

function load_side_panel_a() {
    // side panel a loader
    $(".side-panel-a").replaceWith(side_panel_a_html);
}
const data = `<div class="post-container post-container-clickable">
<div class="post-header"> 
    <a class="post-profile" href="profile.html">
        <img class="post-profile-photo" src="images/empty-profile.png">
    </a>

    <a class="post-profile" href="profile.html">
        thegreatdisciple
    </a>
</div>
<div class="post-content">
    <div class="post-title">
        Last night I attended Finch's 20th anniversary tour of What it is to Burn and felt compelled to write about us aging emo, pop-punk, post-hardcore alternative music fans in our late 30's early 40's...
    </div>

    <a class="post-subforum alternative"> Alternative </a>

    <div class="post-body">
        I first heard this album as a senior in high school back in 2002 and was blown away - it combined the intensity of post-hardcore and the catchy melodic aspect of pop-punk beautifully .
        Back then I listened to all sorts of rock music from metal to hardcore but definitely was also huge fan of pop-punk, emo and post hardcore and listened to bands like New Found Glory, 
        Thursday, Starting Line, Get Up Kids, the Ataris etc. etc... But something about this album really had me hooked and I would listen to it non-stop. Fast forward over 20 years later to
        last night at the show: I noticed something while looking around in the crowd that I don't really see when I go to shows of the newer, younger bands. I could tell that an overwhelming
        majority of the fans in the crowd were hovering around my age (salt and pepper hair, thinning crowns, wrinkles etc.) and when Finch took the stage and played their album straight through
        it seemed like all of us knew every word and were jumping around in the pit singing at the top of our lungs like we were teenagers again.. only a bit slower and not as intense.
        This got me thinking: what does the future hold for us fans of this music at our age? 40's are pretty much here and 50's and 60's are inevitably coming... What will shows with this kind
         of music be like for us? I thought this would make for an interesting discussion...
    </div>
</div>`

// extract query from URL
const extract_query = (param_name) => {
    const search_params = new URLSearchParams(window.location.search)
    return search_params.get(param_name)
}

$(document).ready(async function() {
    // set search query
    console.log(extract_query("search"))
    $(".search-box").val(extract_query("search"))

    // fill search results
    const posts_list = await postManager.getSearchPosts(extract_query("search")) // get all posts containing the search key
    for(let post of posts_list) {
        postViewManager.search_insert_post(post, extract_query("search"))
    }

    // const posts_list = Object.entries(posts);
    // for(let i = 0; i < Math.min(20, posts_list.length); i++) {
    //     const key = posts_list[i][0];
    //     const val = posts_list[i][1];
    //     insert_post(key);
    // }
}) 

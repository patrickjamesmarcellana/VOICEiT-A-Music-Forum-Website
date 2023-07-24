/* sets scroll handler
    loadInitialPosts - callback that returns the initial set of posts given the requested number of initial posts
    loadMorePosts - callback that returns the next set of posts to display given the cursor and requested number of posts 
    insertPost - callback that inserts the post/comment
    totalPosts (optional) - callback that returns the total amount of posts/comments, return 0 if not implemented
*/
async function setInfiniteScrollHandler(loadInitialPosts, loadMorePosts, insertPost, totalPosts) {
    // unset other scroll handlers
    $(window).off("scroll")

    let added_posts = 0
    let posts_to_add = 5
    let posts_list_exhausted = false
    let posts_list = await loadInitialPosts(posts_to_add)
    for(let i = 0; i < posts_to_add && added_posts < posts_list.length; i++) {
        await insertPost(posts_list[added_posts])
        added_posts++
    }
    
    const see_more_panel = $(`<div class="see-more-panel"><a class="see-more-button" href="/register.html">See More</a></div>`);

    $(".see-more-panel").remove();

    const total_posts = totalPosts ? await totalPosts() : 0
    if(added_posts < total_posts)
        $(".post-panel").append(see_more_panel);

    // add 5 posts each time the window scrolls to the bottom
    let loading= false;
    const request_load = async function() {
        if (!loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 100)) {
            loading= true;
            $(".see-more-panel").remove();
    
            // call for query cursor if needed
            if(!posts_list_exhausted && added_posts + posts_to_add > posts_list.length) {
                const last_sent_post = posts_list[posts_list.length - 1]
                const new_posts = await loadMorePosts(last_sent_post, posts_to_add)
                posts_list.push(...new_posts)
    
                if(new_posts.length == 0) 
                    posts_list_exhausted = true;
            }
    
            for(let i = 0; i < posts_to_add && added_posts < posts_list.length; i++) {
                await insertPost(posts_list[added_posts])
                added_posts++
            }

            // in logged out view, post list can appear exhausted even if added_posts < total_posts due to the restrictions
            if(!posts_list_exhausted || added_posts < total_posts) 
                $(".post-panel").append(see_more_panel);
    
            loading = false; // reset value of loading once content loaded
        }
    }

    $(window).scroll(request_load)

    // NOTE: since we now load posts until we can scroll, this is redundant
    if(is_logged_in()) {
        // allow loading more
        see_more_panel.find("a").click(request_load)
        see_more_panel.find("a").attr("href", "javascript:void")
    }

    // load posts until we can scroll (or run out of posts)
    while($(document).height() <= $(window).height() && !posts_list_exhausted) {
        await request_load()
    }
}
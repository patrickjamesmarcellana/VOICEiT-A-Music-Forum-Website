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
    
    const see_more_panel = $(`<div class="see-more-panel"><a class="see-more-button" href="register.html">See More</a></div>`);
    see_more_panel.remove();

    const total_posts = totalPosts ? await totalPosts() : 0
    console.log(await totalPosts())
    if(added_posts < total_posts)
        $(".post-panel").append(see_more_panel);

    // add 5 posts each time the window scrolls to the bottom
    let loading= false;
    $(window).scroll(async function() {
        if (!loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 100)) {
            loading= true;
            see_more_panel.remove();
    
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
    })
}
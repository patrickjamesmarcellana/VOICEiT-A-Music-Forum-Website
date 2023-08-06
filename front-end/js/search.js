import postManager from "./model/post-manager.js"
import postViewManager from "./view/post-view.js"
import setInfiniteScrollHandler from "./pagination.js"

// extract query from URL
const extract_query = (param_name) => {
    const search_params = new URLSearchParams(window.location.search)
    return search_params.get(param_name).trim()
}

$(document).ready(async function() {
    // set search query
    console.log(extract_query("search"))
    $(".search-box").val(extract_query("search"))

    // const posts_list = Object.entries(posts);
    // for(let i = 0; i < Math.min(20, posts_list.length); i++) {
    //     const key = posts_list[i][0];
    //     const val = posts_list[i][1];
    //     insert_post(key);
    // }

    setInfiniteScrollHandler(
        async(num_posts) => {
            return await postManager.getSearchPosts(extract_query("search"), new URLSearchParams([["post_limit", num_posts]]))
        },
        async (last_sent_post, num_posts) => {
            const queryParams = new URLSearchParams()
            queryParams.append("last_sent_score", last_sent_post.score)
            queryParams.append("last_sent_id", last_sent_post.post_id)
            queryParams.append("post_limit", num_posts)

            return await postManager.getSearchPosts(extract_query("search"), queryParams)
        },
        async (post) => {
            postViewManager.search_insert_post(post, extract_query("search"))
        })
}) 

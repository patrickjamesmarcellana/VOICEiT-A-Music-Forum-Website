$(document).ready(function() {
    // incrementing view count when a post is in the viewport
    let timer = null
    $(window).scroll((e) => {
        // this timer is to somehow check if a user has stopped scrolling (lets go of the scroll bar)
        // time is estimated
        if(timer !== null) {
            clearTimeout(timer);        
        }
        timer = setTimeout(function() {
            // Reference for checking if an element is in viewport: https://awik.io/check-if-element-is-inside-viewport-with-javascript/#:~:text=To%20find%20out%20if%20the,the%20viewport%20height%20ie%20window.
            const posts = document.querySelectorAll(".post-container")
            for(post of posts) {
                let bounding = post.getBoundingClientRect();
                const post_id = post.getAttribute("post-id") 
                if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                    console.log('Element ' + post_id + ' is in the viewport!');
                    const post = postManager.getPost(post_id) // getting the post will increment the view count
                } 
            }
        }, 200); // 200 -> in milliseconds
    })
})
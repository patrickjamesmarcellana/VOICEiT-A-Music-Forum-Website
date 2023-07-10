const postViewManager = {
    insert_post: function(post, post_insertion_location=".post-panel") {
        const post_id = post.post_id
        const inserted_post = $(`
                    <div class="post-container post-container-clickable" post-id="${post_id}">
                        <div class="post-header"> 
                            <a href="profile.html?user=${post.op}" class="post-profile">
                                <img class="post-profile-photo" src="images/${post.op}.jpg">
                            </a>
    
                            <a href="profile.html?user=${post.op}" class="post-profile">
                                ${post.op}
                            </a>
                            &nbsp;•&nbsp; <span class="post-date"> ${new Date(post.date).toDateString('en-CA')} | ${new Date(post.date).toLocaleTimeString()} </span>  
    
                            <span class="post-options-button">
                                <div class="options-dropdown">
                                    <button class="edit-post-button">
                                        <span class="edit-sprite">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        &nbsp;&nbsp;Edit
                                    </button> <br>
                                    <button class="delete-post-button">
                                        <span class="delete-sprite">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        &nbsp;&nbsp;Delete
                                    </button>
                                </div>
                            </span>
                        </div>
                    
                        <div class="post-content" >
                            <div class="post-title">
                                ${post.title}
                            </div>
    
                            <a class="post-subforum ${post.subforum}"> ${forums[post.subforum].name} </a>
    
                            <div class="post-body">
                                ${post.text}
                            </div>
    
                            <div class="post-buttons">
                                <button class="upvote-sprite"></button>
                                <span class="upvote-count">5</span>
                                <button class="downvote-sprite"></button>
                                <span class="downvote-count">5</span>
                                <a class="comment-sprite" href="post.html?post=${post_id}"></a>
                                <a class="comment-count" href="post.html?post=${post_id}">${post.comment_count}</a>
                            </div>
                        </div>
                    </div>
                    `);
        $(post_insertion_location).append(inserted_post)
    
        // hiding it
        if(!is_logged_in() || post.op !== "melissa_spellman") {
            console.log(inserted_post)
            inserted_post.find(".post-options-button").css("display", "none")
        }
    
        // making post containers a clickable container to post.html
        inserted_post.click(function(e) {
            // e.currentTarget - element where listener is registered (in this case element with class post-container-clickable)
            // e.target - exact element (can be e.currentTarget or its descendant)
            const exact_element_pressed = e.target;
            if(exact_element_pressed.classList.contains("edit-post-button")) {
                window.location.href = "edit-post.html?post=" + e.currentTarget.getAttribute("post-id");
            } else {
                // do not go if we pressed <a> or <button> or an element declared with suffix -button
                if(!(["a", "button"].includes(exact_element_pressed.tagName.toLowerCase()) ||
                     [...exact_element_pressed.classList].some(class_name => class_name.endsWith("-button"))
                   )) {
                    window.location.href = "post.html?post=" + e.currentTarget.getAttribute("post-id");
                }
            }
        })
        return inserted_post
    }
} 

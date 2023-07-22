const postViewManager = {
    insert_post: function(post, post_insertion_location=".post-panel") {
        const post_id = post.post_id
        const inserted_post = $(`
                    <div class="post-container post-container-clickable" post-id="${post_id}">
                        <div class="post-header"> 
                            <a href="profile.html?user=${post.op}" class="post-profile">
                                <img class="post-profile-photo" src="${post.photoUrl}">
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
                                    </button>
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
                                <button title="Upvote" class="post-upvote-button upvote-sprite"></button>
                                <span class="upvote-count" title="Upvote Count"></span>
                                <button title="Downvote" class="post-downvote-button downvote-sprite"></button>
                                <span class="downvote-count" title="Downvote Count"></span>
                                <a class="comment-sprite" title="Comment" href="post.html?post=${post_id}"></a>
                                <a class="comment-count" title="Comment Count" href="post.html?post=${post_id}">${post.comment_count}</a>
                                <span class="analytics-icon analytics-sprite view-analytics-button" title="Post Views/Clicks"></span>
                                <span class="view-count" title="Post Views/Clicks">${post.views}</span>

                            </div>
                        </div>
                    </div>
                    `);
        $(post_insertion_location).append(inserted_post)
    
        // hiding it
        if(!is_logged_in() || post.op !== Cookies.get("logged_in_as")) {
            console.log(inserted_post)
            // inserted_post.find(".edit-post-button").css("display", "none")
            // inserted_post.find(".delete-post-button").css("display", "none")
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
                // do not go if we pressed <a> or <button> or <textarea> or an element declared with suffix -button
                if(!(["a", "button", "textarea"].includes(exact_element_pressed.tagName.toLowerCase()) ||
                     [...exact_element_pressed.classList].some(class_name => class_name.endsWith("-button"))
                   )) {
                    window.location.href = "post.html?post=" + e.currentTarget.getAttribute("post-id");
                }
            }
        })

        // add votes
        inserted_post.attr("upvote-count", post.upvote_count)
        inserted_post.attr("downvote-count", post.downvote_count)
        updateVoteUI(inserted_post.get(0), post.vote_state, [post.upvote_count, post.downvote_count])

        // add vote listeners
        inserted_post.find(".post-upvote-button").click(onPostVoteButtonPressed)
        inserted_post.find(".post-downvote-button").click(onPostVoteButtonPressed)

        return inserted_post
    },
    search_insert_post: function(post, search_key, post_insertion_location=".post-panel") {
        const post_id = post.post_id
        let keys = search_key.split(" ")
        for(let key of keys) {
            key = key.trim()
            key = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }
        
        let regex_string = ""
        for(let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
                regex_string += (keys[i])
            } else {
                regex_string += (keys[i] + "|")
            }
        }

        const pattern = new RegExp(`${regex_string}`, "gi")
        let post_title = post.title
        let post_text = post.text
        post_title = post_title.replace(pattern, match => `<span class="mark">${match}</span>`)
        post_text = post_text.replace(pattern, match => `<span class="mark">${match}</span>`)
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
                                    </button>
                                    <button class="delete-post-button">
                                        <span class="delete-sprite">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        &nbsp;&nbsp;Delete
                                    </button>
                                </div>
                            </span>
                        </div>
                    
                        <div class="post-content" >
                            <div class="post-title">
                                ${post_title}
                            </div>
    
                            <a class="post-subforum ${post.subforum}"> ${forums[post.subforum].name} </a>
    
                            <div class="post-body">
                                ${post_text}
                            </div>
    
                            <div class="post-buttons">
                                <button title="Upvote" class="post-upvote-button upvote-sprite"></button>
                                <span class="upvote-count" title="Upvote Count"></span>
                                <button title="Downvote" class="post-downvote-button  downvote-sprite"></button>
                                <span class="downvote-count" title="Downvote Count"></span>
                                <a class="comment-sprite" title="Comment" href="post.html?post=${post_id}"></a>
                                <a class="comment-count" title="Comment Count" href="post.html?post=${post_id}">${post.comment_count}</a>
                                <span class="analytics-icon analytics-sprite view-analytics-button" title="Post Views/Clicks"></span>
                                <span class="view-count" title="Post Views/Clicks">${post.views}</span>

                            </div>
                        </div>
                    </div>
                    `);
        $(post_insertion_location).append(inserted_post)
    
        // hiding it
        if(!is_logged_in() || post.op !== Cookies.get("logged_in_as")) {
            console.log(inserted_post)
            // inserted_post.find(".edit-post-button").css("display", "none")
            // inserted_post.find(".delete-post-button").css("display", "none")
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
                // do not go if we pressed <a> or <button> or <textarea> or an element declared with suffix -button
                if(!(["a", "button", "textarea"].includes(exact_element_pressed.tagName.toLowerCase()) ||
                     [...exact_element_pressed.classList].some(class_name => class_name.endsWith("-button"))
                   )) {
                    window.location.href = "post.html?post=" + e.currentTarget.getAttribute("post-id");
                }
            }
        })

        // add votes
        inserted_post.attr("upvote-count", post.upvote_count)
        inserted_post.attr("downvote-count", post.downvote_count)
        updateVoteUI(inserted_post.get(0), post.vote_state, [post.upvote_count, post.downvote_count])

        // add vote listeners
        inserted_post.find(".post-upvote-button").click(onPostVoteButtonPressed)
        inserted_post.find(".post-downvote-button").click(onPostVoteButtonPressed)

        return inserted_post
    } 
} 

posts = {
    1: {
        subforum: "pop",
        op: "insertuserhere",
        title: "Help me ID this pop song that goes “ay oh ay oh ay oh”",
        text: `
        This has been stuck in my head for the past several hours and it’s been infuriating. In some part of the song, the male singer sings “ay oh ay oh ay oh”. I heard it from the mall today so it must be a pop song. It also sounds slightly like EDM. It sounds like it was released around 2012-2015-ish. I’ve been searching all over Google, Reddit, and YouTube for the past 6 hours and I haven’t gotten any close. It is driving me crazy. I will literally give one of my kidneys if any one of you could identify this song. Please help me
        <br>
        I’ve recorded a sample which I hope helps: https://vocaroo.com/12Y0LTxSjHCr
        `
    }
}

// to be filled by hardcoded_comments_xx.js
const hardcoded_comments = new Array(10).fill(null)

$(document).ready(function() {
    const search_params = new URLSearchParams(window.location.search)
    post_id = search_params.get("post")

    post = posts[post_id]
    $(".post-subforum").attr("href", "index.html?forum=" + post.subforum)
    $(".post-subforum").text("v/" + post.subforum)
    $(".post-profile-text").attr("href", "profile.html?user=" + post.op)
    $(".post-profile-text").text(post.op)
    $(".post-title").text(post.title)
    $(".post-body").html(post.text)
    hardcoded_comments[post_id]()
})
const posts = {
    1: {
        subforum: "pop",
        op: USER5,
                
        title: "Help me ID this pop song that goes “ay oh ay oh ay oh”",
        text: `
        This has been stuck in my head for the past several hours and it’s been infuriating. In some part of the song, the male singer sings “ay oh ay oh ay oh”. I heard it from the mall today so it must be a pop song. It also sounds slightly like EDM. It sounds like it was released around 2012-2015-ish. I’ve been searching all over Google, Reddit, and YouTube for the past 6 hours and I haven’t gotten any close. It is driving me crazy. I will literally give one of my kidneys if any one of you could identify this song. Please help me
        <br>
        I’ve recorded a sample which I hope helps: https://vocaroo.com/12Y0LTxSjHCr
        `,
        date: "5 hours ago",
        top_level_comments_list: [101, 103, 105]
    },
    2: {
        subforum: "rap",
                
        op: USER2,
        title: "Eminem: Recovery or Relapse?",
        text: `
        Discuss.
        `,
        date: "5 days ago",
        top_level_comments_list: [201, 203]
    },
    3: {
        subforum: "rock",
        op: USER2,
                
        title: "Remember the time when Billboard announced the top 10 rock songs of the 2010s and none of the songs were rock?",
        text: `
        For context, the list is:<br>
        1. Imagine Dragons - Believer<br>
        2. Imagine Dragons - Thunder<br>
        3. Imagine Dragons - Radioactive<br>
        4. Panic! At The Disco - High Hopes<br>
        5. The Lumineers - Ho Hey<br>
        6. Twenty One Pilots - Heathens<br>
        7. Walk The Moon - Shut Up And Dance<br>
        8. Portugal. The Man - Feel It Still<br>
        9. Twenty One Pilots - Ride<br>
        10. Twenty One Pilots - Stressed Out<br><br>

        What an absolute joke.<br>
        `,
        date: "Last Edited: 3 hours ago",
        top_level_comments_list: [301]
    },
    4: {
        subforum: "rnb",
        op: USER1,
                
        title: "Thoughts on SZA - SOS?",
        text: `
        I thought it was pretty good. How about you guys?
        `,
        date: "4 months ago",
        top_level_comments_list: [401, 402, 403]
    },
    5: {
        subforum: "kpop",
        op: USER3,
                
        title: "Fifty Fifty becomes longest-charting K-pop girl group on Billboard Hot 100",
        text: `
        Cupid just broke BLACKPINK and Dua Lipa - Kiss and Make Up’s 12-week record on the Billboard Hot 100.
        <br>
        Link: https://en.yna.co.kr/view/AEN20230622002200315
        `,
        date: "Last Edited: 2 minutes ago",
        top_level_comments_list: [501, 503]
    },
    6: {
        subforum: "latin",
        op: USER4,
                
        title: "How did Bad Bunny blow up?",
        text: `
        I can’t stand this guy. His voice and singing are both bad, and his rapping and songwriting skills are absolutely terrible. I’d be lying if I said he didn’t have any good song instrumentals, but apart from that, that’s really it. I don’t really see anything else of value that would make me like this guy. So can anyone please explain to me why this guy is so big? It really is baffling.
        `,
        date: "Last Edited: 9 hours ago",
        top_level_comments_list: [601, 604]
    },
    7: {
        subforum: "jazz",
                
        op: USER1,
        title: "What album do you think is perfect?",
        text: `
        For me, Kind of Blue by Miles Davis. Overplayed, sure. Doesn’t change a thing, though.
        `,
        date: "6 days ago",
        top_level_comments_list: [701, 703]
    },
    8: {
        subforum: "classical",
        op: USER1,
                
        title: "How to start listening to classical music?",
        text: `
        I want to start listening to classical music. Where should one start? Any recommendations would be much appreciated. Thank you!
        `,
        date: "1 year ago",
        top_level_comments_list: [801, 802, 803]
    },
    9: {
        subforum: "country",
        op: USER4,
                
        title: "Why don’t most people don’t like country music?",
        text: `
        I am completely aware that there are some (really) bad country songs out there, but to be fair, all genres have THE bad songs that people laugh at or don’t want to talk about. But I really do feel like a lot of people hate country music, more so than any other genre. I sincerely hope that isn’t just me thinking that. But anyway, to both country music fans, non-fans, and haters, what do you think puts people off when it comes to country music?
        `,
        date: "7 months ago",
        top_level_comments_list: [901, 903, 904]
    },
    10: {
        subforum: "alternative",
        op: USER5,
                
        title: "The future of alternative music",
        text: `
        I find it pretty sad that among my friends, I am the only one who listens to alternative and indie rock. They all just listen to your typical, generic pop and rap. While I respect the fact that people have different tastes, which is quite evident, it makes me feel lonely, like I can’t even talk to them about the music I love. Instead, I have to consult strangers on the internet I’ve never seen or met before. I’m just worried that someday, alternative music will just completely fade into obscurity never to be seen again, and I feel like I will really struggle in relating to other people’s tastes in music. Thoughts?
        `,
        date: "Last Edited: 2 days ago",
        top_level_comments_list: [1001, 1002]
    },
}

// to be filled by hardcoded_comments_xx.js
const hardcoded_comments = new Array(11).fill(null)

$(document).ready(function() {
    // register all comments
    Object.keys(posts).forEach((key) => {
        hardcoded_comments[key]()
    })
})

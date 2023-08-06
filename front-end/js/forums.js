function Forum(name, description) {
    this.name = name;
    this.description = description;
}

// forums list
const forums = {
    home: new Forum("Recent", `
            You are now in the Recent forum — VOICEiT's home page.
            The posts you see are the recently posted voice-its.
            Interact with fellow users and share your thoughts about the different genres of music!
        `),

    popular: new Forum("Popular", `
            You are now in the Popular forum.
            The posts you see are the most popular voice-its based on a calculated ranking.
            Interact with fellow users and share your thoughts about the different genres of music!
        `),

    alternative: new Forum("Alternative", `
            Alternative rock is a subgenre of rock music that evolved from the 1970s independent music underground
            and became prominent in the 1990s. The term "alternative" alludes to how the genre differs from mainstream 
            or commercial rock or pop music. <br><br>
            Interact with fellow users and share your thoughts about alternative music!
        `),

    classical: new Forum("Classical", `
            In general, the term "classical music" refers to Western art music, which is distinguished from 
            Western folk music or popular music traditions. It is frequently referred to as Western classical music,
            since "classical music" also refers to non-Western art music. <br><br>
            Interact with fellow users and share your thoughts about classical music!
        `),

    country: new Forum("Country", `
            Known for its basic style, folk lyrics, and harmonies, country music is characterized by its ballads
            and dancing melodies, which are accompanied by instruments including banjos, fiddles, harmonicas, and
            other varieties of guitar, including acoustic, electric, steel, and resonator guitars.<br><br>
            Interact with fellow users and share your thoughts about country music!
        `),

    jazz: new Forum("Jazz", `
            Jazz is commonly characterized by syncopated rhythms, polyphonic ensemble playing, varied degrees
            of improvisation, frequently deliberate pitch deviations, and the incorporation of original timbres.
            It was largely influenced by ragtime and the blues.<br><br>
            Interact with fellow users and share your thoughts about jazz music!
        `),

    kpop: new Forum("Kpop", `
            K-pop, or Korean Pop, is the 21st century's prevailing, aesthetic-driven, style-bending, trendsetting
            music genre. K-pop, which originated in South Korea, takes influences from a variety of genres,
            including pop, experimental, rock, hip-hop, R&B, electronic, and dance. <br><br>
            Interact with fellow users and share your thoughts about kpop!
        `),

    latin: new Forum("Latin", `
            The music industry uses the phrase "Latin music" to refer to numerous kinds of music from Ibero-America,
            which includes Latin America, Spain, Portugal, and the Latino community in Canada and the United States,
            as well as songs sung in either Spanish or Portuguese.<br><br>
            Interact with fellow users and share your thoughts about latin music!
        `),

    pop: new Forum("Pop", `
            Pop music is distinguished by recurrent choruses and hooks, short to medium-length songs produced
            in a basic style (typically the verse-chorus structure), and rhythms or tempos that are easy to
            dance to. A lot of pop music takes aspects from other genres like rock, urban, dance, Latin, and country. <br><br>
            Interact with fellow users and share your thoughts about pop music!
        `),

    rnb: new Forum("R&B", `
            Rhythm and blues, also known as R&B or R'n'B, is a popular music genre that emerged among
            African-American communities in the 1940s. Lyrical topics in R&B frequently express the African-American
            experience of suffering and the struggle for freedom and joy, as well as victories and failures in relationships,
            finances, and aspirations. <br><br>
            Interact with fellow users and share your thoughts about RnB music!
        `),

    rap: new Forum("Rap", `
            Hip hop music, often known as rap music and formerly known as disco rap, is a popular music genre
            that comprises of stylized rhythmic music (typically constructed around drum beats) that frequently
            accompanies a rhythmic and rhyming speech called rapping.<br><br>
            Interact with fellow users and share your thoughts about rap music!
        `),

    rock: new Forum("Rock", `
            Rock music is a diverse genre of popular music that began in the United States as "rock and roll". 
            Rock has centered on the electric guitar as an instrument, usually as part of a rock band with an 
            electric bass guitar, drums, and one or more singers.<br><br>
            Interact with fellow users and share your thoughts about rock music!
        `),
}

export default forums
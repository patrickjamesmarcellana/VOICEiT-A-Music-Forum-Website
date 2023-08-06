module.exports = Object.freeze({
    SESSION_TIMEOUT_SECS: 21 * 86400, // 21 days

    VOTE_TYPE_POST: 0,
    VOTE_TYPE_COMMENT: 1,

    STATE_NOT_VOTED: 0,
    STATE_UPVOTED: 1,
    STATE_DOWNVOTED: 2,
    STATE_INVALID: 3
})
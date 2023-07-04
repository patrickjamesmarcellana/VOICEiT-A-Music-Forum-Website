const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        index: true
    },
    description: {
        type: String,
        default: ""
    },
    photoUrl: {
        type: String,
        default: "empty-profile.png"
    }
});

module.exports = model('User', userSchema);
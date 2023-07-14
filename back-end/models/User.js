const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    photoUrl: {
        type: String,
        default: "empty-profile.png"
    },
    lastLogin: {
        type: Date,
        default: new Date()
    },
    registerDate: {
        type: Date,
        immutable: true,
        default: new Date()
    }
});

module.exports = model('User', userSchema);
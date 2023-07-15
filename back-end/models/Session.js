const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        immutable: true,
    },
    uuid: {
        type: String,
        immutable: true,
    },
    expiresAt: {
        type: Date,
        expiresAt: 10, // 10s test
        default: new Date(),
    }
});

module.exports = model('Session', sessionSchema); 

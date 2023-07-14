const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const passwordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = model('Password', passwordSchema);
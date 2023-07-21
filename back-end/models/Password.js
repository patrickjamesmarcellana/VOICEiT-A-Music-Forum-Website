const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SALT_WORK_FACTOR = 10 // how long the salt will be

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

passwordSchema.pre('save', async function(next) {
    const user = this; // this -> current document being modified
    console.log("save pre hook called")
    if(!user.isModified('password'))
        // `return next();` will make sure the rest of this function doesn't run
        return next()

    // hashing code here
    try {
        // generate random salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR) // salt work factor -> how long the salt will be
        // produce the hashed value
        const hash = await bcrypt.hash(user.password, salt) // (<password in plaintext>, <salt to be used for hashing>)
        // replace user's password with the hashed value
        user.password = hash // replace the password field with the hashed output
        next()
    } catch(err) {
        console.error(err)
        return next(err)
    }
})

passwordSchema.method('comparePassword', function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
})

module.exports = model('Password', passwordSchema);
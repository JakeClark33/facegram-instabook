const mongoose = require('mongoose');
const thought = require('./thought');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: "Username is required!",
        trim: true
},
// match stolen from https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
    email: {
        type: String,
        unique: true,
        required: 'You must enter an email!',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought"}],
    friends:  []

});
userSchema.virtual('friendLength').get(function () {
    return this.friends.length
})
const user = mongoose.model('user', userSchema)




module.exports = user;
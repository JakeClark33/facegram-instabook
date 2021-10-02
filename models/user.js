const {Schema, model} = require('mongoose');
// const thought = require('./thought');
// const Schema = mongoose.Schema;

const UserSchema = new Schema(  
     {
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],

        friends:  [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
    }
}
);
UserSchema.virtual('friendLength').get(function () {
    return this.friends.length
})
const User = model('User', UserSchema)




module.exports = { User };
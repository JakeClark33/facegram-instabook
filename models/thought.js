const { Schema, model } = require('mongoose');
const thought = require('./user');

//code length stolen from https://stackoverflow.com/questions/22405975/how-to-validate-string-length-with-mongoose
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You must enter thoughts!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    username: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Username'
    },
    reactions: {
        reactionCount: []
    },
})
const reaction = mongoose.model('reaction', reactionSchema)

module.exports = thought;
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const user = require('./user');
const ObjectId = mongoose.Types.ObjectId;
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
        type: Schema.Types.ObjectID,
        ref: 'Username'
    },
    reactions: {
        reactionCount: []
    },
})

const reactionSchema = new Schema ({
    
    reactionId: {
        type: ObjectId,
        default: new ObjectId 
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const reaction = mongoose.model('reaction', reactionSchema)
const thought = mongoose.model('thought', thoughtSchema)
module.exports = { thought, reaction };

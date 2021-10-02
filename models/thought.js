const {Schema, model, Types} = require('mongoose');
// const dateFormat = require('../utils');

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema
// const user = require('./User');
// const ObjectId = mongoose.Types.ObjectId;


//code length stolen from https://stackoverflow.com/questions/22405975/how-to-validate-string-length-with-mongoose

const ReactionSchema = new Schema ({
    
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() 
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

const ThoughtSchema = new Schema(
    {
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
            type: String,
            required: "You must enter a username!"
        },
        reactions: [ ReactionSchema ]
    }
)


// const reaction = mongoose.model('Reaction', reactionSchema)
const Thought = model('Thought', ThoughtSchema)
module.exports = { Thought };

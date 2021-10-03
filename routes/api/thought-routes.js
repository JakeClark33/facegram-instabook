    const router = require('express').Router();
    const { 
            addThought, 
            removeThought, 
            allThoughts, 
            addReaction, 
            updateThought, 
            removeReaction,
        } = require('../../controller/thought-controller');

    const thoughtRoutes = require('../../models/Thought');
    const UserRoutes = require('./user-routes');

    // set up GET all and POST - /api/thoughts
    router
        .route('/:userId')
        .get(allThoughts)
        .post(addThought);

    //set up get 1, PUT (Edit), and DELETE - /api/thoughts/:id
    router
        .route('/:userId/:thoughtId')
        .put(updateThought)
        .delete(removeThought)

    //set up POST routes for Reactions - api/thoughts/:thoughtId/reactions
    router
        .route('/api/thoughts/:thoughtId/reactions')
        .post(addReaction)

    //set up DELETE for reactions - api/thoughts/:thoughtID/reactions/:reactionId
    router
        .route('/api/thoughts/:thoughtID/reactions/:reactionId')
        .delete(removeReaction)


module.exports = router;
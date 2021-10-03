    const router = require('express').Router();
    const { 
            addThought, 
            removeThought, 
            allThoughts, 
            addReaction, 
            updateThought, 
            removeReaction,
            getThoughtById,

        } = require('../../controller/thought-controller');

    const thoughtRoutes = require('../../models/hought');
    const UserRoutes = require('./user-routes');
//PREFIX HAS /api/thoughts
    // set up GET all and POST - /api/thoughts/:userId
    router
        .route('/:userId')
        .get(allThoughts)
        .post(addThought);

    //set up get 1, PUT (Edit), and DELETE - /api/thoughts/:id
    router // req.params.userId
    // api/thoughts/thought/:thoughtId
        .route('/thought/:thoughtId')
        .get(getThoughtById)
        .put(updateThought)
        .delete(removeThought)

    //set up POST routes for Reactions - api/thoughts/:thoughtId/reactions
    router
        .route('/reactions/:thoughtId')
        .post(addReaction)

    //set up DELETE for reactions - api/thoughts/:thoughtID/reactions/:reactionId
    router
        .route('/:thoughtID/reactions/:reactionId')
        .delete(removeReaction)

// api/thoughts/:thoughtId/user/:userId
module.exports = router;


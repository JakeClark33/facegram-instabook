const router = require('express').Router();
const { addThought, removeThought } = require('../../controller/thought-controller');
// const userRoutes = require('./user-routes');
// const thoughtModel = require('../../models/Thought');

// router.use('/thoughts', thoughtRoutes);
// router.use('/users', userRoutes);
// /api/comments/<userId>

// set up GET all and POST - /api/thoughts
router
    .route('/')
    // .get(allThoughts)
    .post(addThought);

//set up get 1, PUT (Edit), and DELETE - /api/thoughts/:id
router
    .route('/:id')
    // .get(thoughtById)
    // .put(updateThought)
    .delete(removeThought);

//set up POST routes for Reactions - api/thoughts/:thoughtId/reactions


//set up DELETE for reactions - api/thoughts/:thoughtID/reactions/:reactionId


// /api/comments/userId/thoughtId
router

module.exports = router;
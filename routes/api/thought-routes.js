const router = require('express').Router();
const { addThought, removeThought } = require('../../controller/thought-controller');
// const userRoutes = require('./user-routes');
// const thoughtModel = require('../../models/Thought');
const thoughtRoutes = require('../../models/Thought');
const UserRoutes = require('./user-routes');

const{
    addReaction,
    removeReaction,
} = require('../../controller/thought-controller');


router.use('/thoughts', thoughtRoutes);
router.use('/users', UserRoutes);
// /api/comments/<userId>

// set up GET all and POST - /api/thoughts
router
    .route('/:userId')
    // .get(allThoughts)
    .post(addThought);

//set up get 1, PUT (Edit), and DELETE - /api/thoughts/:id
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought)

//set up POST routes for Reactions - api/thoughts/:thoughtId/reactions


//set up DELETE for reactions - api/thoughts/:thoughtID/reactions/:reactionId

router.route('/:userId/:thoughtId/:reactionId').delete(removeReply);
// /api/comments/userId/thoughtId
router

module.exports = router;
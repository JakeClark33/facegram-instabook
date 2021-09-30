const router = require('express').Router();
const { addThought, removeThought } = require('../../controller/thought-controller');
const commentRoutes = require('./thought-routes');
const pizzaRoutes = require('./user-routes');


router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
// /api/comments/<userId>
router.route('/:userId').post(addThought);

// /api/comments/userId/thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;
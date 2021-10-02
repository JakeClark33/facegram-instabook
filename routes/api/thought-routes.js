const router = require('express').Router();
const { addThought, removeThought } = require('../../controller/thought-controller');
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
const thoughtModel = require('../../models/thought');

// router.use('/thoughts', thoughtRoutes);
// router.use('/users', userRoutes);
// /api/comments/<userId>
router.post('/api/user', (req, res ) => {
    thoughtModel.create({})
        .then(dbUser => {
        res.json(dbUser)
}) 
.catch(err => {
    res.json(err)
});
})

// /api/comments/userId/thoughtId
router.delete('/api/user/thought');

module.exports = router;
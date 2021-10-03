const router= require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
const friendsRoutes = require('./friends-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendsRoutes)

module.exports = router;
